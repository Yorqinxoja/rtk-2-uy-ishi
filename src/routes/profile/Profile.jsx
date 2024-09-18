import React from "react";
import { Card, Avatar, Typography } from "antd";
import { useProfileQuery } from "../../redux/api/profileApi";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile = () => {
  const { data } = useProfileQuery();

  return (
    <div className="profile-container">
      {data && data.payload && (
        <Card
          hoverable
          style={{ width: 300, margin: "auto", textAlign: "center" }}
          cover={
            <Avatar
              size={100}
              src={data.payload.photo_url}
              icon={<UserOutlined />}
              alt="Profile"
            />
          }
        >
          <Title level={3}>{data.payload.username}</Title>
          <Title level={4}>{data.payload.first_name}</Title>
        </Card>
      )}
    </div>
  );
};

export default Profile;
