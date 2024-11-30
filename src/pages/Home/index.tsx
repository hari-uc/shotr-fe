import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, ArrowRight, Plus } from 'lucide-react';

export default function Home() {
  const [topics, setTopics] = useState(['Tech', 'Social', 'Education']);
  const [newTopic, setNewTopic] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(false);

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' && newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
      setShowTopicInput(false);
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
          <div className="space-y-2">
            <Input 
              type="url" 
              placeholder="Enter your long url here"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="Custom alias (optional)"
              className="h-8 text-sm"
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
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTopicInput(false)}
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
                >
                  <option value="">Select a topic</option>
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
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full space-x-2">
            <span>Shorten</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}