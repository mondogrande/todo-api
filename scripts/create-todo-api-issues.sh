#!/bin/bash

# Epic: ユーザー認証機能
gh issue create --title "Epic: ユーザー認証機能" \
  --label "type:epic,priority:high" \
  --body "ユーザー登録、ログイン、JWT検証を実装する"

# Issue #2: ユーザー登録
gh issue create --title "feat: ユーザー登録機能を実装" \
  --label "type:feature,priority:high,ai-task,domain:auth" \
  --body "POST /api/auth/register を実装。email, password, name を受け取り、bcryptでハッシュ化、JWT発行。"

# Issue #3: ユーザーログイン
gh issue create --title "feat: ユーザーログイン機能を実装" \
  --label "type:feature,priority:high,ai-task,domain:auth" \
  --body "POST /api/auth/login を実装。email/passwordで認証、JWT発行。Blocked by: #2"

# Issue #4: JWT検証Middleware
gh issue create --title "feat: JWT検証Middlewareを実装" \
  --label "type:feature,priority:high,ai-task,domain:auth" \
  --body "Authorizationヘッダーのトークンを検証するMiddlewareを実装。Blocked by: #3"

# Issue #5: Todo作成API
gh issue create --title "feat: POST /api/todos エンドポイントを実装" \
  --label "type:feature,priority:high,ai-task,domain:api" \
  --body "認証済みユーザーがTodoを作成。Blocked by: #4"

# Issue #6: Todo一覧取得API
gh issue create --title "feat: GET /api/todos エンドポイントを実装" \
  --label "type:feature,priority:medium,ai-task,domain:api" \
  --body "認証済みユーザーのTodo一覧を取得（作成日時降順）。Blocked by: #4"

# Issue #7: Todo更新API
gh issue create --title "feat: PUT /api/todos/:id エンドポイントを実装" \
  --label "type:feature,priority:medium,ai-task,domain:api" \
  --body "自分のTodoのみ更新可能。他ユーザーは403。Blocked by: #4"

# Issue #8: Todo削除API
gh issue create --title "feat: DELETE /api/todos/:id エンドポイントを実装" \
  --label "type:feature,priority:low,ai-task,domain:api" \
  --body "自分のTodoのみ削除可能。他ユーザーは403。Blocked by: #4"

echo "✅ All issues created"
