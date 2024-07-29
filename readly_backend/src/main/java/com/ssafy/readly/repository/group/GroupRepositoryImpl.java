package com.ssafy.readly.repository.group;

import com.ssafy.readly.dto.group.GetGroupResponse;
import com.ssafy.readly.dto.group.MakeGroupRequest;
import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.entity.Group;
import com.ssafy.readly.entity.GroupTag;
import com.ssafy.readly.entity.Tag;
import com.ssafy.readly.enums.IsInviting;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepository{
    private final EntityManager em;

    @Override
    public String makeGroup(MakeGroupRequest makeGroupRequest) {
        // Create and persist the Group entity
        Group group = new Group(
                makeGroupRequest.getTitle(),
                makeGroupRequest.getDescription(),
                makeGroupRequest.getCreatedDate(),
                makeGroupRequest.getMaxParticipants(),
                makeGroupRequest.getRoomId(),
                IsInviting.A // Default value
        );
        em.persist(group);
        em.flush(); // Ensure the entity is saved to get the ID

        // Print a debug message (optional)
        System.out.println("Group created with ID: " + group.getMaxParticipants());

        // Process tags
        Set<GroupTag> groupTags = new HashSet<>();
        for (String tagName : makeGroupRequest.getTags()) {
            // Fetch or create Tag entity
            Tag tag = em.createQuery("SELECT t FROM Tag t WHERE t.name = :name", Tag.class)
                    .setParameter("name", tagName)
                    .getResultStream()
                    .findFirst()
                    .orElse(new Tag(tagName));

            if (tag.getId() == null) {
                em.persist(tag);
                em.flush(); // Ensure tag is saved to get the ID
            }

            // Create and add GroupTag to the set
            GroupTag groupTag = new GroupTag(group, tag);
            groupTags.add(groupTag);
        }

        // Set GroupTags for the Group
        for (GroupTag groupTag : groupTags) {
            group.addGroupTag(groupTag); // Add tags using Group's method
        }

        return String.valueOf(group.getId());
    }

    public void updateRoomId(String groupId, String roomId) {
        Group group = em.find(Group.class, Long.parseLong(groupId));
        if (group != null) {
            group.updateRoomId(roomId);
        }
    }

    @Override
    public List<GetGroupResponse> findAllGroup() throws Exception {
        String jpql = "SELECT g FROM Group g LEFT JOIN FETCH g.groupTags gt LEFT JOIN FETCH gt.tag";
        TypedQuery<Group> query = em.createQuery(jpql, Group.class);
        List<Group> groups = query.getResultList();

        return groups.stream()
                .map(group -> {
                    // Extract tags
                    Set<String> tags = group.getGroupTags().stream()
                            .map(gt -> gt.getTag().getName())
                            .collect(Collectors.toSet());

                    // Create and return response
                    return new GetGroupResponse(
                            group.getId(),
                            group.getTitle(),
                            group.getDescription(),
                            group.getCreatedDate(),
                            tags
                    );
                })
                .collect(Collectors.toList());
    }


}
