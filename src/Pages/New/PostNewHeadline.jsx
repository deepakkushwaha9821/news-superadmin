import React, { useState } from 'react';
import axios from 'axios';

const PostHeadline = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postedBy, setPostedBy] = useState('Arun');
  const [schedulePost, setSchedulePost] = useState(false);
  const [enableComments, setEnableComments] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2025-07-05');
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('postedBy', postedBy);
    formData.append('schedulePost', schedulePost);
    formData.append('enableComments', enableComments);
    formData.append('scheduleDate', scheduleDate);
    formData.append('scheduleTime', scheduleTime);
    if (thumbnail) formData.append('avatar', thumbnail); // backend expects "avatar"

    try {
      const response = await axios.post(
        'https://newsportalbackend-crdw.onrender.com/api/v1/admin-news/new-headline-create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('✅ Headline posted successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setThumbnail(null);
      setThumbnailUrl('');
    } catch (err) {
      console.error('Upload error:', err);
      if (err.response) {
        setError(`❌ ${err.response.data.message || 'Server error occurred'}`);
      } else {
        setError('❌ Network error or server unavailable');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📰 Create New News Headline</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 border border-dashed p-6 rounded-lg text-center">
          <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" id="thumbnailInput" />
          <label htmlFor="thumbnailInput" className="cursor-pointer text-blue-500">📷 Upload Thumbnail</label>
          {thumbnail && <p className="text-sm text-green-600 mt-2">Selected: {thumbnail.name}</p>}
          {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" className="w-32 h-32 mx-auto mt-2 rounded" />}
        </div>

        <label className="block mb-2 font-semibold">Title</label>
        <input type="text" className="w-full border p-2 rounded-lg mb-4" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline Title" required />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea className="w-full border p-2 rounded-lg mb-4 h-24" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Headline Description" required />

        <label className="block mb-2 font-semibold">Posted By</label>
        <input type="text" className="w-full border p-2 rounded-lg mb-4" value={postedBy} onChange={(e) => setPostedBy(e.target.value)} required />

        <div className="flex gap-6 mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={schedulePost} onChange={() => setSchedulePost(!schedulePost)} />
            <span>Schedule Post</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={enableComments} onChange={() => setEnableComments(!enableComments)} />
            <span>Enable Comments</span>
          </label>
        </div>

        {schedulePost && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Date</label>
              <input type="date" className="w-full border p-2 rounded-lg" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Time</label>
              <input type="time" className="w-full border p-2 rounded-lg" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-[#1C2059] text-white p-3 rounded-lg mt-4 hover:bg-[#2c3a91]" disabled={loading}>
          {loading ? 'Posting...' : 'Post News Headline'}
        </button>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PostHeadline;
