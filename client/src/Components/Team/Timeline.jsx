import React, { useState } from 'react';
import { Avatar, Button, Input, Upload, Card, message as antdMessage } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  FileOutlined,
  FontColorsOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  TableOutlined,
  MinusOutlined,
  CodeOutlined,
  PictureOutlined,
  AudioOutlined,
  SendOutlined,
  DownloadOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const TimelinePage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "19-07-2024 12:00:00 am",
      message: "Hi, guys! We are planning for our next vacation tour here. Please share your opinion!",
      image: "https://rise.fairsketch.com/files/timeline_files/timeline_post_file64be20e989b3e-home-office.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "John Doe",
      date: "19-07-2024 12:00:00 am",
      message: "Lets try a home office for the next week.",
      image: "https://rise.fairsketch.com/files/timeline_files/timeline_post_file64be1edc85d91-vacation.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      name: "John Doe",
      date: "19-07-2024 12:00:00 am",
      message: "Lets try a home office for the next week.",
      image: "https://rise.fairsketch.com/files/timeline_files/timeline_post_file64be1edc85d91-vacation.jpg", // Replace with actual image URL
    },
    {
        id: 4,
        name: "John Doe",
        date: "19-07-2024 12:00:00 am",
        message: "Lets try a home office for the next week.",
        image: "https://rise.fairsketch.com/files/timeline_files/timeline_post_file64be1edc85d91-vacation.jpg", // Replace with actual image URL
      },
  ]);
  const [newPost, setNewPost] = useState({
    message: '',
    file: null,
  });

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, message: e.target.value });
  };

  const handleFileChange = ({ file }) => {
    setNewPost({ ...newPost, file });
  };

  const handleSubmit = () => {
    if (!newPost.message) {
      antdMessage.error('Please enter a message!');
      return;
    }

    const newPostData = {
      id: posts.length + 1,
      name: "John Doe",
      date: new Date().toLocaleString(),
      message: newPost.message,
      image: newPost.file ? URL.createObjectURL(newPost.file.originFileObj) : null,
    };

    setPosts([newPostData, ...posts]);
    setNewPost({ message: '', file: null });
    antdMessage.success('Post created successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '20px', border: '1px solid #f0f0f0', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Avatar style={{ marginRight: '10px' }} icon={<PictureOutlined />} />
          <Button icon={<BoldOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<ItalicOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<UnderlineOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<FileOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<FontColorsOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<OrderedListOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<UnorderedListOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<AlignLeftOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<AlignCenterOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<AlignRightOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<TableOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<MinusOutlined />} style={{ marginRight: '5px' }} />
          <Button icon={<CodeOutlined />} style={{ marginRight: '5px' }} />
        </div>
        <TextArea
          rows={5}
          placeholder="Share an idea or documents..."
          style={{ marginBottom: '10px' }}
          value={newPost.message}
          onChange={handleInputChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Upload onChange={handleFileChange} showUploadList={false}>
            <Button icon={<UploadOutlined />} style={{ marginRight: '10px' }}>Upload File</Button>
          </Upload>
          <Button icon={<AudioOutlined />} style={{ marginRight: '10px' }}>Voice</Button>
          <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>Post</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {posts.map(post => (
          <Card key={post.id} style={{ width: '48%', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ marginRight: '10px' }} icon={<UserOutlined />} />
               
                <div>
                  <strong>{post.name}</strong>
                  <br />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
            <p>{post.message}</p>
            {post.image && <img src={post.image} alt="post" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button type="link" icon={<DownloadOutlined />}>Download</Button>
              <Button type="link">Reply</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimelinePage;
