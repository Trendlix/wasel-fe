import SingleBlogClient from "@/shared/components/pages/blogs/blog/single-blog-client";
import { blogCardItems } from "@/shared/constants/blogs";

const SingleBlog = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = blogCardItems.find((blog) => blog.slug === slug);
    if (!blog) return null;

    return (<main>
        <SingleBlogClient blog={blog} />
    </main>)
}

export default SingleBlog;