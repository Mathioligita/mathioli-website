import fetchHandler from "api/Handler";

// This is your existing API function
export const BookAPI = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: "/user/book",
      retries: 5,
      backoff: 500,
    });
    const data = await response?.data?.json();
    console.log("BookAPI data:", data);

    return data.map((post) => ({
      slug: post.slug,
      updatedAt: post.updatedAt,
      title: post.title,
    }));
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
};

// Add this default export React component
export default function BookPage() {
  return (
    <div>
      <h1>Book API Helper</h1>
      <p>This page contains the BookAPI utility function.</p>
    </div>
  );
}
