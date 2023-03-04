import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";
import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface AuthorProps {
    name: string;
    role: string;
    avatarUrl: string;
}

interface ContentProps {
    type: "paragraph" | "link";
    content: string;
}

export interface PostType {
    id?: number;
    author: AuthorProps;
    publishedAt: Date;
    content: ContentProps[];
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState<string[]>([]);
    const [newCommentText, setNewCommentText] = useState("");

    const publishedDateFormatted = format(
        post.publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        {
            locale: ptBR,
        }
    );

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        // const newCommentText = event.target.comment.value;
        setComments([...comments, newCommentText]);
        setNewCommentText("");
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        // Preciso avisar para o JavaScript que o campo está válido
        event.target.setCustomValidity("");
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("O comentário não pode ficar em branco");
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(
            (item) => item !== commentToDelete
        );
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;
    return (
        <>
            <article className={styles.post}>
                <header>
                    <div className={styles.author}>
                        <Avatar hasBorder={true} src={post.author.avatarUrl} />
                        <div className={styles.authorInfo}>
                            <strong>{post.author.name}</strong>
                            <span>{post.author.role}</span>
                        </div>
                    </div>
                    <time
                        title={publishedDateFormatted}
                        dateTime={post.publishedAt.toISOString()}
                    >
                        {publishedDateRelativeToNow}
                    </time>
                </header>
                <div className={styles.content}>
                    {post.content.map((item) => {
                        if (item.type === "paragraph") {
                            return <p key={item.content}>{item.content}</p>;
                        } else if (item.type === "link") {
                            return (
                                <p key={item.content}>
                                    <a href="#">{item.content}</a>
                                </p>
                            );
                        }
                    })}
                </div>

                <form
                    onSubmit={handleCreateNewComment}
                    className={styles.commentForm}
                >
                    <strong>Deixe seu feedback</strong>
                    <textarea
                        name="comment"
                        value={newCommentText}
                        placeholder="Deixe um comentário"
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                    />
                    <footer>
                        <button type="submit" disabled={isNewCommentEmpty}>
                            Publicar
                        </button>
                    </footer>
                </form>
                <div className={styles.commentList}>
                    {comments.map((comment) => {
                        return (
                            <Comment
                                key={comment}
                                content={comment}
                                onDeleteComment={deleteComment}
                            />
                        );
                    })}
                </div>
            </article>
        </>
    );
}
