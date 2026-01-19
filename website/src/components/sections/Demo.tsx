import { useState } from 'react';

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const problemExample = `Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, 
and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`;

  const userCode = `function twoSum(nums, target) {
  // Your code here
  for (let i = 0; i < nums.length; i++) {
    // TODO: Complete the logic
  }
}`;

  const responses: Record<string, string> = {
    hint: `💡 Try thinking about hash maps! You can store each number's index as you iterate, and check if the complement (target - current number) exists in your map.`,
    validate: `✅ Your approach of using a loop is good! Consider: What data structure would help you quickly check if a number exists? A hash map would give you O(1) lookup time.`,
    dryrun: `Let's trace through with nums=[2,7,11,15], target=9:\n\n1. i=0, nums[i]=2, need 9-2=7\n2. Check if 7 exists in map? No, add {2: 0}\n3. i=1, nums[i]=7, need 9-7=2\n4. Check if 2 exists? Yes! Return [0, 1]`,
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setIsTyping(true);
    setResponse('');

    const responseText = responses[action] || '';
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < responseText.length) {
        setResponse(responseText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);
  };

  return (
    <section id="demo" className="section-padding bg-dark-bg" aria-labelledby="demo-heading">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 id="demo-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            See CodeSensei in Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-tight">
            Experience how CodeSensei helps you solve problems without giving away the answer.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* Problem Statement */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Problem: Two Sum</h3>
              <div className="bg-dark-bg rounded-lg p-4 border border-white/10">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {problemExample}
                </pre>
              </div>
            </div>

            {/* Code Editor */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Your Code</h3>
              <div className="bg-dark-bg rounded-lg p-4 border border-white/10">
                <pre className="text-sm text-gray-300 font-mono">
                  {userCode}
                </pre>
              </div>
            </div>
          </div>

          {/* CodeSensei Widget */}
          <div className="lg:col-span-3">
            <div className="glass-strong rounded-2xl p-4 sm:p-6 border-2 border-primary-500/50 sticky top-20 sm:top-24">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-lg sm:text-xl font-bold gradient-text">CodeSensei</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button
                  onClick={() => handleAction('hint')}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-1 ${
                    selectedAction === 'hint'
                      ? 'bg-primary-600 text-white border border-primary-500'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="Get hint"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="hidden sm:inline">Get Hint</span>
                </button>
                <button
                  onClick={() => handleAction('validate')}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-1 ${
                    selectedAction === 'validate'
                      ? 'bg-primary-600 text-white border border-primary-500'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="Validate logic"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">Validate</span>
                </button>
                <button
                  onClick={() => handleAction('dryrun')}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-1 ${
                    selectedAction === 'dryrun'
                      ? 'bg-primary-600 text-white border border-primary-500'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="Dry run code"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">Dry-Run</span>
                </button>
              </div>

              {/* Response Area */}
              <div className="bg-dark-bg rounded-lg p-4 border border-white/10 min-h-[200px]">
                {response ? (
                  <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {response}
                    {isTyping && (
                      <span className="inline-block w-2 h-4 bg-primary-400 ml-1 animate-pulse" />
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm flex items-center justify-center h-full">
                    Click a button above to see CodeSensei in action
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            This is a demo. Install the extension for real LeetCode integration.
          </p>
        </div>
      </div>
    </section>
  );
}
