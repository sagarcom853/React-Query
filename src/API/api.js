export const fetchPosts = async (page) => {
  const response = await fetch(
    `http://localhost:3000/posts?_sort=-id&${
      page ? `_page=${page}&_per_page=5` : ""
    }`
  );
  const postData = await response.json();
  return postData;
};

export const fetchTags = async () => {
  const response = await fetch("http://localhost:3000/tags?_sort=-id");
  const tagsData = await response.json();
  return tagsData;
};

export const addPosts = async (post) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};
