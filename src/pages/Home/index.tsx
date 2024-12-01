import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, ArrowRight, Plus, Loader2, ExternalLinkIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createShortLink } from '@/api/service/shorten-link';

const { HOST_URL } = process.env;

export default function Home() {
  const [topics, setTopics] = useState(['Tech', 'Social', 'Education']);
  const [newTopic, setNewTopic] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ shortUrl: string; createdAt: string } | null | undefined>(null);
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' && newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
      setShowTopicInput(false);
    }
  };

  const resetForm = () => {
    setLongUrl('');
    setCustomAlias('');
    setSelectedTopic('');
    setError(null);
  };

  const handleShorten = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      if (!longUrl) {
        throw new Error('Please enter a URL to shorten');
      }

      const response = await createShortLink(longUrl, customAlias, selectedTopic);

      if (!response.success) {
        throw new Error(response.error || 'Failed to create short link');
      }

      setSuccess(response.data);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Shorten URL
            </h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                <div className="space-y-2">
                  <p>Successfully created short link!</p>
                  <a 
                    href={success.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all flex items-center space-x-2"
                  >
                    {success.shortUrl}
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Enter your long url here"
              className="h-10"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{HOST_URL}</span>
            <Input
              type="text"
              placeholder="Custom alias (optional)"
              className="w-1/2 h-8 text-sm"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            {showTopicInput ? (
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter new topic and press Enter"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-8 text-sm"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTopicInput(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="flex-1 h-8 px-3 text-sm rounded-md border border-input bg-background"
                  disabled={isLoading}
                >
                  <option value="">Select a topic (optional)</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTopicInput(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full space-x-2" 
            onClick={handleShorten}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Shorten</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}