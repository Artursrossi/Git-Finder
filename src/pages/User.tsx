import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import "../styles/User.css";

interface githubUserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  location: string;
  html_url: string;
}

interface githubUserRepositories {
  id: number;
  name: string;
  html_url: string;
}

export const PageUser = () => {
  const { profile } = useParams();
  const navigate = useNavigate();

  if (!profile) return <Navigate to="/" replace={true} />;

  const [githubUserData, setGithubUserData] = useState<githubUserData | null>(
    null
  );
  const [githubUserRepositories, setGithubUserRepositories] = useState<
    githubUserRepositories[]
  >([]);

  async function fetchUserData() {
    try {
      const githubUserData = await axios.get(
        `https://api.github.com/users/${profile}`
      );
      setGithubUserData(githubUserData.data);

      const githubUserRepositories = await axios.get(
        `https://api.github.com/users/${profile}/repos`
      );
      setGithubUserRepositories(githubUserRepositories.data);
    } catch (error: any) {
      if (error.response.status === 404) return navigate("/user-not-found");
      if (error.response.status === 403) return navigate("/rate-limit");

      return navigate("/");
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {!githubUserData && <h1 className="loading-text">Carregando...</h1>}
      {githubUserData && (
        <main className="user-main">
          <div className="user-card">
            <img
              className="user-avatar"
              src={githubUserData.avatar_url}
              alt={githubUserData.name}
              width={256}
              height={256}
            />
            <h1 className="user-name">{githubUserData.name}</h1>
            <span className="user-ref">@{githubUserData.login}</span>
            {githubUserData.location && (
              <span className="user-location">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {githubUserData.location}
              </span>
            )}
            <div className="user-followers">
              <span>Followers: {githubUserData.followers}</span>
              <span>Following: {githubUserData.following}</span>
            </div>
            <div className="user-repos">
              <h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>{" "}
                Repositórios:
              </h2>
              {githubUserRepositories.map((repositories) => {
                return (
                  <a
                    key={repositories.id}
                    className="user-repos-card"
                    href={repositories.html_url}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="6" x2="6" y1="3" y2="15" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                    <h1 className="user-repos-name">{repositories.name}</h1>
                  </a>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </>
  );
};
