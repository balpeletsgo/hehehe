import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";

interface PostItemProps {
  post: string;
  author: {
    firstName: string;
    lastName: string | null;
    username: string;
  };
  createdAt: Date;
}

export default function PostItem({ post, author, createdAt }: PostItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="inline-flex items-center gap-1">
          <CardTitle>
            {author.firstName} {author.lastName}
          </CardTitle>
          <span className="text-muted-foreground text-sm font-normal">
            @{author.username}
          </span>
        </div>
        <CardDescription>{formatRelativeDate(createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="whitespace-pre-line">{post}</CardContent>
    </Card>
  );
}
