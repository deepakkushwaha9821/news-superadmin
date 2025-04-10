import React, { useState } from "react";

const PostVideo = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [schedulePost, setSchedulePost] = useState(false);
  const [enableComments, setEnableComments] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to post form data
    alert("Form submitted!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Create New Headlines</h2>

      <form onSubmit={handleSubmit}>
        {/* Upload Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Thumbnail Upload */}
          <div className="border border-dashed border-gray-400 p-6 text-center flex flex-col items-center justify-center cursor-pointer">
            <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" id="thumbnailInput" />
            <label htmlFor="thumbnailInput" className="cursor-pointer text-gray-500">📷 Add Thumbnail</label>
            {thumbnail && <img src={thumbnail} alt="Thumbnail Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>

          {/* Video Upload */}
          <div className="border border-dashed border-gray-400 p-6 text-center flex flex-col items-center justify-center cursor-pointer">
            <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="videoInput" />
            <label htmlFor="videoInput" className="cursor-pointer text-gray-500">📤 Upload Video</label>
            {video && <video src={video} controls className="mt-2 w-full h-32 rounded-lg" />}
          </div>
        </div>

        {/* Title Input */}
        <label className="block mb-2 font-semibold">Title</label>
        <input 
          type="text" 
          className="w-full border p-2 rounded-lg mb-4" 
          placeholder="Enter headline title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description</label>
        <textarea 
          className="w-full border p-2 rounded-lg mb-4 h-24" 
          placeholder="Enter details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Posted By */}
        <label className="block mb-2 font-semibold">Posted By</label>
        <input 
          type="text" 
          className="w-full border p-2 rounded-lg mb-4" 
          placeholder="Enter name"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
        />

        {/* Options */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="schedule" 
              className="w-4 h-4"
              checked={schedulePost}
              onChange={() => setSchedulePost(!schedulePost)}
            />
            <label htmlFor="schedule" className="font-semibold">Schedule your post</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="comments" 
              className="w-4 h-4"
              checked={enableComments}
              onChange={() => setEnableComments(!enableComments)}
            />
            <label htmlFor="comments" className="font-semibold">Enable Comments</label>
          </div>
        </div>

        {/* Schedule Inputs */}
        {schedulePost && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Schedule Posting Date</label>
              <input 
                type="date" 
                className="w-full border p-2 rounded-lg"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Schedule Posting Time</label>
              <input 
                type="time" 
                className="w-full border p-2 rounded-lg"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-[#1C2059] text-white p-3 rounded-lg hover:bg-[#2c3a91] transition">
          Post Headline
        </button>
      </form>
    </div>
  );
};

export default PostVideo;
