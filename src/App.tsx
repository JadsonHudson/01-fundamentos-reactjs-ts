import { Post, PostType } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import styles from "./App.module.css";
import "./global.css";

// author: {avatar_url: "" , name: "", role: ""}
// publishedAt: Date
// content: String

const posts: PostType[] = [
    {
        id: 1,
        author: {
            avatarUrl: "https://github.com/JadsonHudson.png",
            name: "Jadson Hudson",
            role: "Web Developer",
        },
        content: [
            { type: "paragraph", content: "falaaa galeraa 👋" },
            {
                type: "paragraph",
                content:
                    "Acabei de subir mais um projeto no meu portfolio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀 👉",
            },
            { type: "link", content: "jane.design/doctorcare" },
        ],
        publishedAt: new Date("2023-02-14 10:01:53"),
    },
    {
        id: 2,
        author: {
            avatarUrl: "https://github.com/maykbrito.png",
            name: "Mayk Brito",
            role: "Educator @Rocketseat",
        },
        content: [
            { type: "paragraph", content: "Boa noite rede 👋" },
            {
                type: "paragraph",
                content: "Meu parabéns a todos e tchau🚀 👉",
            },
            { type: "link", content: "jane.design/doctorcare" },
        ],
        publishedAt: new Date("2023-02-24 00:04:33"),
    },
];

function App() {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />

                <main>
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />;
                    })}
                </main>
            </div>
        </div>
    );
}

export default App;
