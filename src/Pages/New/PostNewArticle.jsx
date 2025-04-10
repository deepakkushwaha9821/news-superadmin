import React, { useState } from 'react';
import axios from 'axios';

const PostNewArticle = () => {
  const [title, setTitle] = useState('Test Headline'); // Default for testing
  const [description, setDescription] = useState('This is a test description.');
  const [postedBy, setPostedBy] = useState('Arun');
  const [schedulePost, setSchedulePost] = useState(false);
  const [enableComments, setEnableComments] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2025-07-05');
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    console.log('📤 Form Submission Triggered');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('postedBy', postedBy);
    formData.append('schedulePost', schedulePost);
    formData.append('enableComments', enableComments);
    formData.append('scheduleDate', scheduleDate);
    formData.append('scheduleTime', scheduleTime);
    if (avatar) formData.append('avatar', avatar);

    for (let [key, value] of formData.entries()) {
      console.log(`🔍 ${key}:`, value);
    }

    try {
      const response = await axios.post(
        'https://newsportalbackend-crdw.onrender.com/api/v1/admin-news/new-headline-create',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('✅ Success:', response.data);
      setMessage('✅ Article posted successfully!');
    } catch (error) {
      console.error('❌ Error:', error);
      if (error.response) {
        console.error('🛑 Server Response:', error.response.data);
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Network error or server not reachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Article</h2>

      {/* Avatar Upload */}
      <div className="border border-dashed border-gray-400 p-6 text-center mb-4 rounded-lg cursor-pointer">
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatarInput" />
        <label htmlFor="avatarInput" className="cursor-pointer">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Cover Preview" className="w-32 h-32 mx-auto rounded-md object-cover" />
          ) : (
            <div className="w-10 h-10 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xl font-bold">+</div>
          )}
          <span className="text-gray-500 block mt-2">Add Cover Photo</span>
        </label>
      </div>

      {avatar && <p className="text-sm text-green-600 mt-2">Selected: {avatar.name}</p>}

      <label className="block mb-2 font-semibold">Title</label>
      <input type="text" className="w-full border p-2 rounded-lg mb-4" placeholder="Enter headline title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea className="w-full border p-2 rounded-lg mb-4 h-24" placeholder="Enter details" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={schedulePost} onChange={() => setSchedulePost(!schedulePost)} />
          <span>Schedule Post</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={enableComments} onChange={() => setEnableComments(!enableComments)} />
          <span>Enable Comments</span>
        </label>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 font-semibold">Date</label>
          <input type="date" className="w-full border p-2 rounded-lg" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-semibold">Time</label>
          <input type="time" className="w-full border p-2 rounded-lg" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
        </div>
      </div>

      <button type="submit" className="w-full bg-[#1C2059] text-white p-3 rounded-lg mt-6 hover:bg-blue-700" disabled={loading}>
        {loading ? 'Posting...' : 'Post Headline'}
      </button>

      {message && <p className="text-center mt-4 text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default PostNewArticle;
