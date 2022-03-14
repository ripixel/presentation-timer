echo "[Fuckit] Autosaving..."

DATE=`date +%Y-%m-%d_%H-%M-%S`
BRANCH=`git rev-parse --abbrev-ref HEAD`

git checkout -b "$BRANCH-$DATE" && git add . && git commit -m "Autosave $DATE" && git push origin "$BRANCH-$DATE" && git checkout "$BRANCH" && git rebase "$BRANCH-$DATE"

echo "[Fuckit] Done"
