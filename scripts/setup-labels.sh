#!/bin/bash

# Type Labels
gh label create "type:feature" --description "新機能" --color "0075ca" --force
gh label create "type:bug" --description "バグ修正" --color "d73a4a" --force
gh label create "type:refactor" --description "リファクタリング" --color "fbca04" --force
gh label create "type:docs" --description "ドキュメント" --color "0075ca" --force
gh label create "type:test" --description "テスト追加" --color "0e8a16" --force
gh label create "type:chore" --description "ビルド・設定変更" --color "fef2c0" --force
gh label create "type:perf" --description "パフォーマンス改善" --color "ff9800" --force
gh label create "type:epic" --description "大きな機能のまとまり" --color "3f51b5" --force

# Priority Labels
gh label create "priority:critical" --description "最優先" --color "b60205" --force
gh label create "priority:high" --description "優先度高" --color "d93f0b" --force
gh label create "priority:medium" --description "優先度中" --color "fbca04" --force
gh label create "priority:low" --description "優先度低" --color "0e8a16" --force

# Status Labels
gh label create "status:backlog" --description "いつか対応" --color "ededed" --force
gh label create "status:ready" --description "着手可能" --color "c2e0c6" --force
gh label create "status:in-progress" --description "作業中" --color "ffeb3b" --force
gh label create "status:review" --description "レビュー待ち" --color "9c27b0" --force
gh label create "status:blocked" --description "ブロックされている" --color "e11d21" --force

# AI Labels
gh label create "ai-task" --description "AIが処理するタスク" --color "00bcd4" --force
gh label create "ai-ready" --description "AI処理可能" --color "4caf50" --force
gh label create "ai-blocked" --description "人間の判断が必要" --color "e91e63" --force
gh label create "human-review" --description "人間のレビュー必須" --color "ff5722" --force

# Domain Labels
gh label create "domain:auth" --description "認証機能" --color "7e57c2" --force
gh label create "domain:api" --description "API" --color "5c6bc0" --force
gh label create "domain:database" --description "データベース" --color "42a5f5" --force

echo "✅ All labels created successfully"
