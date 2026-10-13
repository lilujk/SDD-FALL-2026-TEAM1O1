CREATE TABLE IF NOT EXISTS users(
    "id"      UUID    PRIMARY KEY DEFAULT AUTO_INCREMENT,
    "name"    text    DEFAULT ""

)

CREATE TABLE IF NOT EXISTS resources(
    "id"        UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "title"     text    DEFAULT "",
    "user_id"   int(11) UNIQUE DEFAULT "",
    "description" text  DEFAULT "",
    "link"      text    UNIQUE DEFAULT "",
    "approved"  BOOLEAN DEFAULT 0,
    "free"      int     DEFAULT 0
)

CREATE TABLE IF NOT EXISTS warnings(
    "resource_id" int(11),
    "warning_id"  int
)

CREATE TABLE IF NOT EXISTS medium(
    "resource_id" int(11),
    "medium_id"  int
)


CREATE TABLE IF NOT EXISTS likes(
    "resource_id" int(11),
    "user_id"  int(11)
)

CREATE TABLE IF NOT EXISTS comments(
    "id"        UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "resource_id" int(11),
    "user_id"   int(11),
    "parent_id" int(11)  DEFAULT "resource_id",
    "text"      text
)

CREATE TABLE IF NOT EXISTS saved_resources(
    "id"        UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "resource_id" int(11) ,
    "user_id"   int(11),
    "folder_id" int(11)
)

CREATE TABLE IF NOT EXISTS folders(
    "id"        UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "user_id"  int(11),
    "title"    text 
)

CREATE TABLE IF NOT EXISTS favorite_tags(
    "id"        UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "resource_id" int(11),
    "user_id"   int(11),
)

CREATE TABLE IF NOT EXISTS tags(
    "id"      UUID    PRIMARY KEY DEFAULT UNIQUE AUTO_INCREMENT,
    "name"    text     DEFAULT "",
    "parent"  int(11)  DEFAULT NULL,
    ""
)

-- make unique
CREATE TABLE IF NOT EXISTS taggings(
    "tag_id"    int(11),
    "resource_id" int(11)
)

/*
Resource Properties
- Freeform/Canonical tags (tag set, i get why now)
- Warning tags
- Medium tags
- Resource description
- Resource link
- Title
- Approval status (always true in private mode) //optional
- free/freemium/paid
- id //internal
 
Tags Properties
- canonical tag → parent tag
- name
- id
- freeform tag → child tag
- name
- parent id
- self id
*/