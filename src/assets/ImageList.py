# get file names of the images
import os

path = "./images"
names = os.listdir(path)

print()
print("Copy and paste to app.component.ts (imgPath variable):")
pathDeclare = "imgPath = ["
for name in names:
  pathDeclare += "\'assets/images/" + name + "\', "

pathDeclare = pathDeclare[:-2] + "];"
print(pathDeclare)
