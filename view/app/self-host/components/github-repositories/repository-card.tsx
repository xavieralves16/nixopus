import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github, Star, GitFork, AlertCircle, Lock, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GithubRepository } from '@/redux/types/github';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';


import { TypographySmall, TypographyMuted } from '@/components/ui/typography';

const GithubRepositories = ({
  name,
  html_url: url,
  description,
  private: isPrivate,
  stargazers_count,
  forks_count,
  open_issues_count,
  license,
  topics,
  id,
  setSelectedRepository
}: GithubRepository & { setSelectedRepository: (repo: string) => void }) => {
  const { t } = useTranslation();

  return (
    <Card
      className="group relative w-full max-w-md cursor-pointer overflow-hidden transition-all duration-300 hover:bg-muted hover:shadow-lg"
      onClick={() => setSelectedRepository(id.toString())}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          <Github className="text-primary" size={20} />
          <TypographySmall>
            {name || t('selfHost.repositoryCard.unnamed')}
          </TypographySmall>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-muted-foreground transition-colors duration-200 hover:text-primary"
              title={t('selfHost.repositoryCard.viewOnGithub')}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">
            <TypographyMuted>{description}</TypographyMuted>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={isPrivate ? 'secondary' : 'outline'} className="text-xs font-medium">
            {isPrivate ? (
              <Lock size={12} className="mr-1" />
            ) : (
              <Unlock size={12} className="mr-1" />
            )}
            {isPrivate
              ? t('selfHost.repositoryCard.visibility.private')
              : t('selfHost.repositoryCard.visibility.public')}
          </Badge>
          {license && license.spdx_id && (
            <Badge variant="outline" className="text-xs font-medium">
              {license.spdx_id}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star size={16} />
            <span>{stargazers_count?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={16} />
            <span>{forks_count?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle size={16} />
            <span>{open_issues_count?.toLocaleString() || '0'}</span>
          </div>
        </div>
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {topics.slice(0, 2).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs font-medium">
                {topic}
              </Badge>
            ))}
            {topics.length > 2 && (
              <Badge variant="secondary" className="text-xs font-medium">
                {t('selfHost.repositoryCard.topics.more').replace(
                  '{count}',
                  (topics.length - 2).toString()
                )}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GithubRepositories;
