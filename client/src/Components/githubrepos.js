import React, { useEffect, useState } from "react";

const GithubLanguageStats = ({ username }) => {
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = "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";

  useEffect(() => {
    const fetchLanguageStats = async () => {
      try {
        const headers = GITHUB_TOKEN
          ? { Authorization: `token ${GITHUB_TOKEN}` }
          : {};

        const reposResponse = await fetch(
          `https://api.github.com/users/Teoory/repos`,
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error("GitHub API'den veri alınamadı!");
        }

        const reposData = await reposResponse.json();

        let aggregatedLanguages = {};

        await Promise.all(
          reposData.map(async (repo) => {
            const langResponse = await fetch(repo.languages_url, { headers });
            const langData = await langResponse.json();

            // Dilleri birleştir
            for (const [language, lines] of Object.entries(langData)) {
              if (aggregatedLanguages[language]) {
                aggregatedLanguages[language] += lines;
              } else {
                aggregatedLanguages[language] = lines;
              }
            }
          })
        );

        setLanguages(aggregatedLanguages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageStats();
  }, [username]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div>
      <h1>{username} Kullanıcısının Kullandığı Teknolojiler ve Satır Sayıları</h1>
      <ul>
        {Object.entries(languages).map(([language, lines]) => (
          <li key={language}>
            <strong>{language}</strong>: {lines.toLocaleString()} satır
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubLanguageStats;