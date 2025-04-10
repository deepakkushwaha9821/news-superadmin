import { useState } from "react";

const PostNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    // Preview for image/video
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you'd send this data to your backend or database
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    }

    console.log("Post submitted:", { title, content, media });

    // Reset form
    setTitle("");
    setContent("");
    setMedia(null);
    setPreview(null);
    alert("News posted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Post News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter news headline"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded h-32"
            placeholder="Write your news article..."
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-1">Upload Image or Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="w-full"
          />
          {preview && (
            <div className="mt-2">
              {media?.type?.startsWith("image/") ? (
                <img src={preview} alt="preview" className="h-40 object-cover rounded" />
              ) : (
                <video src={preview} controls className="h-40 rounded" />
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Post News
        </button>
      </form>
    </div>
  );
};

export default PostNews;
