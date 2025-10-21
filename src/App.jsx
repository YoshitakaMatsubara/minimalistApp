import React from 'react';

export default function SavingsSuggestionApp() {
  const actions = [
    { category: "固定費", name: "保険の見直し", description: "不要な補償がないか確認し、保険料を削減。" },
    { category: "固定費", name: "通信費の削減", description: "プランを見直して格安SIMなどを検討。" },
    { category: "固定費", name: "サブスクリプション整理", description: "使っていない定額サービスを解約。" },
    { category: "継続的", name: "食費の最適化", description: "まとめ買い・冷凍保存でムダを減らす。" },
    { category: "継続的", name: "被服費の削減", description: "季節ごとに必要最低限の服を厳選。" },
    { category: "継続的", name: "交際費の削減", description: "会食を減らし、無料の交流方法を検討。" },
    { category: "突発費用", name: "医療費の削減", description: "ジェネリック医薬品を活用。" },
    { category: "突発費用", name: "冠婚葬祭費の適正化", description: "ご祝儀・香典の相場を見直す。" },
  ];

  const [completed, setCompleted] = React.useState([]);
  const [selectedActions, setSelectedActions] = React.useState([]);
  const [isCalculated, setIsCalculated] = React.useState(false);

  const handleOptimization = () => {
    const shuffled = [...actions].sort(() => Math.random() - 0.5);
    setSelectedActions(shuffled.slice(0, 4));
    setIsCalculated(true);
  };

  const handleComplete = (index) => {
    if (!completed.includes(index)) {
      setCompleted([...completed, index]);
    }
  };

  const progress = Math.round((completed.length / 4) * 100);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">QoL最適化による節約提案</h1>

      {!isCalculated ? (
        <>
          <p className="text-gray-700 mb-6 text-lg">最適化計算を実行して、あなたに合った節約行動を提案します。</p>
          <button
            onClick={handleOptimization}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 shadow-md transition"
          >
            最適化計算を開始
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">今月の節約行動（全4週）</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedActions.map((action, index) => (
              <div key={index} className="border rounded-xl p-5 bg-blue-50 text-left shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500 mb-1">{action.category}</p>
                <h3 className="text-lg font-semibold mb-2 text-blue-700">{action.name}</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">{action.description}</p>
                <button
                  onClick={() => handleComplete(index)}
                  disabled={completed.includes(index)}
                  className={`px-4 py-2 rounded-xl font-medium transition ${
                    completed.includes(index)
                      ? "bg-green-300 text-green-800 cursor-default"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {completed.includes(index) ? "完了済み" : "この行動を完了！"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">達成率: {progress}%</p>

          {completed.length === 4 && (
            <p className="mt-4 text-green-600 font-semibold text-lg">🎉 すべての行動を完了しました！素晴らしいです！</p>
          )}
        </>
      )}
    </div>
  );
}
