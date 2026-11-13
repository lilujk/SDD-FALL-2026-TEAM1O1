package com.team1O1.api.Resource;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id; // int(10) unsigned

    @Column(name = "title", nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(name = "user_id", nullable = false)
    private Long userId; // int(10) unsigned

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "link", nullable = false, columnDefinition = "TEXT")
    private String link;

    @Convert(converter = Resource.BinaryBooleanConverter.class)
    @Column(name = "approved", nullable = false, columnDefinition = "BINARY(1)")
    private Boolean approved = false; // binary(1), '0' / '1'

    /**
     * Access type: 0 free, 1 free registration required, 2 paid subscription, 3
     * paid individual page.
     */
    @Column(name = "free", nullable = false, columnDefinition = "TINYINT(3) UNSIGNED")
    private Integer access = 0; // tinyint(3) unsigned

    @Column(name = "`create`", nullable = false) // `create` is a reserved word, so it's quoted
    private LocalDateTime created;

    public Resource() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public Integer getAccess() {
        return access;
    }

    public void setAccess(Integer access) {
        this.access = access;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    /**
     * Maps the BINARY(1) `approved` column, which holds the ASCII characters '0' /
     * '1'
     * (the schema default x'30' is '0'), to a Java Boolean.
     */
    @Converter
    public static class BinaryBooleanConverter implements AttributeConverter<Boolean, byte[]> {

        @Override
        public byte[] convertToDatabaseColumn(Boolean value) {
            if (value == null)
                return null;
            return new byte[] { (byte) (value ? '1' : '0') };
        }

        @Override
        public Boolean convertToEntityAttribute(byte[] dbData) {
            if (dbData == null || dbData.length == 0)
                return null;
            return dbData[0] == '1' || dbData[0] == 1;
        }
    }

}
