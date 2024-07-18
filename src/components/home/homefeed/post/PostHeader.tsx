import Link from "next/link";


const PostHeader = ({
  userId,
  postUserName,
  postAt,
}: {
  userId: number;
  postUserName: string;
  postAt: string;
}) => {
  return (
    <div className="flex items-center mb-4">
      <Link href={`/postUser/${userId}`}>
        <div className="flex">
          <div className="">
            <p className="text-2xl text-blue-500 font-bold">{postUserName}</p>
            <p className="text-gray-600 text-sm">{postAt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;
