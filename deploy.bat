@ECHO OFF
ECHO Make something
git status
git add -A
git status
git commit -m "push update"
git push

meteor npm install
meteor deploy steveslist.meteorapp.com --free --mongo