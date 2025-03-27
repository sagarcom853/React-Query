import React, { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, addPosts, fetchTags } from "../API/api";

const Postlist = () => {
  const [page, setPage] = useState(1);
  const {
    data: postData,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData
    // gcTime: 0, // never be cached and remains stale
    // refetchInterval: 1000 * 5 // refetching every 5 seconds.
  });
  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    queryKey: ["posts"],
    mutationFn: addPosts,

    onMutate: () => {},
    // we have to invalidate the query to have real time update for the data mutated/posted.
    //on success after the posts has been completed.
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts",{page}],
        exact: true, // only invalidate the posts inside the posts array.
        // predicate: (query) =>
        //   query.queryKey[0] === "posts" && query.queryKey[1].page >= 2,
      });
    },
    onError: (error)=>{
        console.log('error',error)
    }

    // onError: (error, variables, context) => {},
    // onSettled: (data, error, variables, context) => {},
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    // Access all form elements
    const formElements = e.target.elements;

    // Get the title from the input field
    const title = formElements.title.value;

    // Get selected checkboxes for tags
    const tags = Array.from(formElements)
      .filter((el) => el.type === "checkbox" && el.checked) // Filter only checked checkboxes
      .map((el) => el.value); // Map to their values in a single array

    console.log("Title:", title);
    console.log("Tags:", tags);
    if (!title || !tags) return;
    // mutate({ id: postData?.data?.length + 1, title, tags });
    mutate({title, tags });

    e.target.reset();
  };
  //Adding rebase options

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your text"
          name="title"
          className="postbox"
        />
        <div className="tags1">
          {tagsData?.map((tag) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} value={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button>Post</button>
      </form>
      {isLoading && isPending && <p>Loading....</p>}
      {isError && <p>{error?.message}</p>}
      {isPostError && <p onClick={reset}>{postError?.message}</p>}

      <div className="pages">
        <button
          onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))}
          disabled={!postData?.prev}
        >
          Previous Pages 
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((oldPage) => Math.min(oldPage + 1, postData.pages))}
        >
          Next Page
        </button>
      </div>

      {postData?.data?.map((post) => {
        return (
          <div key={post.id} className="posts">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span>{post.title}</span>
              <span>
                {post.tags.map((tag) => (
                  <span className="tags" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Postlist;
