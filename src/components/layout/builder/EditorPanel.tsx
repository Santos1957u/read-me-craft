"use client";

import { useReadme } from "@/context/ReadmeContext";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { ChangeEvent } from "react";

export function EditorPanel() {
  const { state, dispatch } = useReadme();

  const updateBio =
    (field: keyof typeof state.bio) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: "UPDATE_BIO", payload: { [field]: e.target.value } });
    };

  const updateTechStack = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_TECH_STACK",
      payload: { technologies: e.target.value },
    });
  };

  const updateGithubStats =
    (field: keyof typeof state.githubStats) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_GITHUB_STATS",
        payload: { [field]: e.target.value },
      });
    };

  const updateContacts =
    (field: keyof typeof state.contacts) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_CONTACTS",
        payload: { [field]: e.target.value },
      });
    };

  return (
    <div className="space-y-6">
      {/* About */}
      <Card>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-100">О себе</h2>
          <Toggle
            checked={state.bio.enabled}
            onCheckedChange={(checked) =>
              dispatch({ type: "TOGGLE_BIO", payload: checked })
            }
          />
        </div>

        {state.bio.enabled && (
          <div className="mt-4 space-y-4">
            <Field label="Имя">
              <Input
                value={state.bio.name}
                onChange={updateBio("name")}
                placeholder="Ваше имя"
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </Field>
            <Field label="Должность">
              <Input
                value={state.bio.headline}
                onChange={updateBio("headline")}
                placeholder="Frontend-разработчик"
              />
            </Field>
            <Field label="Описание">
              <Textarea
                value={state.bio.description}
                onChange={updateBio("description")}
                placeholder="Расскажите о себе..."
                rows={3}
              />
            </Field>
          </div>
        )}
      </Card>

      {/* Tech */}
      <Card>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Технологии</h2>
          <Toggle
            checked={state.techStack.enabled}
            onCheckedChange={(checked) =>
              dispatch({ type: "TOGGLE_TECH_STACK", payload: checked })
            }
          />
        </div>

        {state.techStack.enabled && (
          <div className="mt-4">
            <Field
              label="Список"
              helper="Перечислите через запятую: React, TypeScript, PostgreSQL"
            >
              <Input
                value={state.techStack.technologies}
                onChange={updateTechStack}
                placeholder="React, TypeScript, Next.js"
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </Field>
          </div>
        )}
      </Card>

      {/* GitHub Stats */}
      <Card>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-100">
            GitHub Статистика
          </h2>
          <Toggle
            checked={state.githubStats.enabled}
            onCheckedChange={(checked) =>
              dispatch({ type: "TOGGLE_GITHUB_STATS", payload: checked })
            }
          />
        </div>

        {state.githubStats.enabled && (
          <div className="mt-4 space-y-4">
            <Field
              label="Username"
              helper="Будет использован в ссылках на статистику"
            >
              <Input
                value={state.githubStats.username}
                onChange={updateGithubStats("username")}
                placeholder="octocat"
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </Field>
            <Toggle
              checked={state.githubStats.showTopLangs}
              onCheckedChange={(checked) =>
                dispatch({
                  type: "UPDATE_GITHUB_STATS",
                  payload: { showTopLangs: checked },
                })
              }
            >
              <span className="text-sm text-gray-200 font-medium">
                Показать топ языков
              </span>
            </Toggle>{" "}
          </div>
        )}
      </Card>

      {/* Contacts */}
      <Card>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Контакты</h2>
          <Toggle
            checked={state.contacts.enabled}
            onCheckedChange={(checked) =>
              dispatch({ type: "TOGGLE_CONTACTS", payload: checked })
            }
          />
        </div>

        {state.contacts.enabled && (
          <div className="mt-4 space-y-4">
            <Field label="GitHub">
              <Input
                value={state.contacts.github}
                onChange={updateContacts("github")}
                placeholder="daniil-petrov"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={state.contacts.email}
                onChange={updateContacts("email")}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Telegram">
              <Input
                value={state.contacts.telegram}
                onChange={updateContacts("telegram")}
                placeholder="@username"
              />
            </Field>
            <Field label="LinkedIn">
              <Input
                value={state.contacts.linkedin}
                onChange={updateContacts("linkedin")}
                placeholder="in/yourname"
              />
            </Field>
            <Field label="Сайт">
              <Input
                type="url"
                value={state.contacts.website}
                onChange={updateContacts("website")}
                placeholder="https://example.com"
              />
            </Field>
          </div>
        )}
      </Card>
    </div>
  );
}
