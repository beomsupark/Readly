import { useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GoButton from "../../components/GoButton/GoButton";
import CreateReview from "../../components/Review/CreateReview";
import Search from "../../components/Search";

export default function ActivityProgress({ groupData }) {
  const [books, setBooks] = useState(groupData.books || []);
  const [group, setGroup] = useState(groupData.group || {});
  const [reviewInput, setReviewInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const updateCurrentPage = (memberId, newPage) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      members: prevGroup.members.map((member) =>
        member.id === memberId ? { ...member, currentPage: newPage } : member
      ),
    }));
  };

  const handleReviewInputChange = (e) => {
    setReviewInput(e.target.value);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalIsOpen(false);
  };

  const handleCreateReview = () => {
    if (selectedBook && reviewInput.trim()) {
      console.log("Review submitted:", reviewInput);

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? { ...book, review: reviewInput } : book
        )
      );

      setReviewInput("");
      closeModal();
    }
  };

  const openSearchModal = () => {
    console.log("Opening search modal");
    setSearchModalIsOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalIsOpen(false);
  };

  const changeBook = (newBook) => {
    if (books.length > 0) {
      setBooks([
        {
          ...books[0],
          id: newBook.id,
          title: newBook.title,
          cover: newBook.image,
          totalPages: newBook.totalPages || 100,
        },
      ]);
    }
    closeSearchModal();
  };

  return (
    <>
      <h2 className="font-bold text-xl mb-1 mt-5">
        현재 <span className="text-custom-highlight">읽고 있는</span> 책
      </h2>
      <div className="container mx-auto p-4">
        {books.length === 0 ? (
          <div className="bg-white p-4 rounded-lg mb-4 flex-cols z-100 w-3/5">
            <div className="flex justify-center items-center bg-[#F5F5F5] w-[9rem] h-[12rem]">
              <h1 className="text-5xl text-[#FFFFFF]">+</h1>
            </div>
            <div className="mt-4 flex justify-start">
              <GoButton text="책 변경하기" onClick={openSearchModal} />
            </div>
          </div>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg mb-4 flex z-100 w-3/5"
            >
              <div>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-[8rem] h-[12rem] mr-4"
                />
                <div className="mt-4 flex justify-start">
                  <GoButton text="책 변경하기" onClick={openSearchModal} />
                </div>
              </div>
              <div className="flex-1 ml-4">
                {group.members && group.members.map((member) => (
                  <div key={member.id} className="mb-4 flex items-center">
                    <p className="mr-4 w-20">{member.name}</p>
                    <div className="flex-1">
                      <ProgressBar
                        currentPage={member.currentPage}
                        totalPages={book.totalPages}
                        onUpdateCurrentPage={(newPage) =>
                          updateCurrentPage(member.id, newPage)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <h2 className="font-bold mb-2 text-xl">
          <span className="text-custom-highlight">책 </span>에 대한{" "}
          <span className="text-custom-highlight">한줄평</span>을 남기고
          싶으신가요?
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-[30rem] mt-1 p-2 border rounded-lg"
            placeholder="한줄평을 입력해주세요"
            value={reviewInput}
            onChange={handleReviewInputChange}
          />
          <GoButton text="생성" onClick={() => books.length > 0 && openModal(books[0])} />
        </div>
      </div>

      {selectedBook && (
        <CreateReview
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          book={selectedBook}
          reviewText={reviewInput}
          onReviewSubmit={handleCreateReview}
        />
      )}

      <Search
        isOpen={searchModalIsOpen}
        onRequestClose={closeSearchModal}
        onBookSelect={changeBook}
      />
    </>
  );
}