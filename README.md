# Code to LLM Bundler

AIコーディングの効率化のために作成しました。
Reactプロジェクトのコードをスムーズにチャットボットと共有 🤖⚛️

## 概要

Code to LLM Bundlerは、Reactプロジェクトのソースコードを大規模言語モデル（LLM）やAIチャットボットに効率的に提供するためのNode.jsツールです。複数のファイルを1つにまとめて（ファイル間の区切り線は`---`）、AIとのコード共有や分析を簡単にします。

## 主な機能

- 🗂 対話的なファイル選択
- ⚛️ React関連ファイル（.js, .jsx, .ts, .tsx）のサポート
- 🔍 ファイルタイプのフィルタリング
- 🚫 特定ディレクトリ（例：components/ui, lib）の除外
- 📄 整理された出力ファイル

## 使い方

1. このリポジトリをReactプロジェクトのルートディレクトリにクローンまたはダウンロードします。
2. `npm install` を実行して依存関係をインストールします。
3. `node bundleCodeForLLM.mjs` を実行します。
4. プロンプトに従って、AIと共有したいReactコンポーネントやファイルを選択します。
5. 生成された `bundled_code_for_llm.txt` ファイルをAIチャットボットに提供します。

## カスタマイズ

- `allowedExtensions` を編集して、対象とするファイル拡張子を変更できます（デフォルトは React 関連ファイル）。
- `excludedDirs` を編集して、除外するディレクトリを指定できます（デフォルトで 'components/ui' と 'lib' を除外）。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。


## 作者

tukiyomi iori
https://x.com/tukiyomiiori

---

AIとのコード共有をスムーズに。Code to LLM Bundlerで、より効率的なAIコーディングができることを願っています。
