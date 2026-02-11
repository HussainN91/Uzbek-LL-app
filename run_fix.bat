@echo off
cd /d "D:\New folder"
python fix_qmarks.py > fix_output.txt 2>&1
echo EXIT_CODE=%ERRORLEVEL% >> fix_output.txt
