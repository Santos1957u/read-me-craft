"use client";

import { useReadme } from "@/context/ReadmeContext";
import { generateBioMarkdown } from "@/lib/markdown/bio";
import { generateTechStackMarkdown } from "@/lib/markdown/techStack";
import { generateGithubStatsMarkdown } from "@/lib/markdown/githubStats";
import { generateContactsMarkdown } from "@/lib/markdown/contacts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export function PreviewPanel() {
  const { state } = useReadme();

  const bioMd = generateBioMarkdown(state.bio);
  const techMd = generateTechStackMarkdown(state.techStack);
  const statsMd = generateGithubStatsMarkdown(state.githubStats);
  const contactsMd = generateContactsMarkdown(state.contacts);
  const fullMarkdown = [bioMd, techMd, statsMd, contactsMd]
    .filter(Boolean)
    .join("\n");

  const [viewMode, setViewMode] = useState<"preview" | "markdown">("preview");

  const renderPreview = () => {
    const elements = [];

    if (state.bio.enabled) {
      elements.push(
        <ReactMarkdown key="bio" remarkPlugins={[remarkGfm]}>
          {generateBioMarkdown(state.bio)}
        </ReactMarkdown>
      );
    }

    if (state.techStack.enabled) {
      elements.push(
        <ReactMarkdown key="tech" remarkPlugins={[remarkGfm]}>
          {generateTechStackMarkdown(state.techStack)}
        </ReactMarkdown>
      );
    }

    if (state.githubStats.enabled && state.githubStats.username.trim()) {
      elements.push(
        <div key="stats" className="mt-4">
          <h3 className="text-lg font-semibold">📊 GitHub Stats</h3>
          <div className="text-sm text-gray-400 mt-1">
            Статистика будет отображена на GitHub после публикации.
          </div>
          {state.githubStats.showTopLangs && (
            <div className="text-sm text-gray-400 mt-1">
              Также будет показан топ языков.
            </div>
          )}
        </div>
      );
    }

    if (state.contacts.enabled) {
      const { enabled, ...contactFields } = state.contacts;
      const hasAnyContact = Object.values(contactFields).some(
        (val) => typeof val === "string" && val.trim() !== ""
      );

      if (hasAnyContact) {
        elements.push(
          <ReactMarkdown key="contacts" remarkPlugins={[remarkGfm]}>
            {generateContactsMarkdown(state.contacts)}
          </ReactMarkdown>
        );
      }
    }

    return elements.length > 0 ? (
      elements
    ) : (
      <p className="text-gray-500 italic">Нет включённых блоков</p>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Предпросмотр</h2>
        <div className="flex bg-gray-700 rounded-md">
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              viewMode === "preview"
                ? "bg-gray-600 text-indigo-300"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Превью
          </button>
          <button
            type="button"
            onClick={() => setViewMode("markdown")}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              viewMode === "markdown"
                ? "bg-gray-600 text-indigo-300"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-700 rounded-lg bg-gray-800 min-h-50">
        {viewMode === "preview" ? (
          <div className="markdown-body p-4 text-gray-200">{renderPreview()}</div>
        ) : (
          <div className="p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
              {fullMarkdown || "// Нет включённых блоков"}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}