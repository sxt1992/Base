DEV_PATH=/home/souche/dev/souche-f2e/projects/dafengche/moBanYanJiu
PREPUB_PATH=/home/souche/prepub/souche-f2e/projects/dafengche/moBanYanJiu
ONLINE_PATH=/home/souche/online/souche-f2e/projects/dafengche/moBanYanJiu

REMOTE_SERVER=souche@115.29.202.141

SOURCE_FILES=./dist/*

help:
	@echo ""
	@echo "  make preview-dev		# 预览发布内容--测试环境（不会执行发布）"
	@echo "  make preview-prepub	# 预览发布内容--预发环境（不会执行发布）"
	@echo "  make preview-prod		# 预览发布内容--线上环境（不会执行发布）"
	@echo ""
	@echo "  make publish-dev		# 发布到测试环境"
	@echo "  make publish-prepub	# 发布到预发环境"
	@echo "  make publish-prod		# 发布到线上环境"

##############################
# 初始化 git 并推送到 gitlab
# ##############################
init-git:
	@git init
	@git remote add origin git@git.souche.com:fis-projects/dafengche-moBanYanJiu.git
	@git add .
	@git commit -m "init dafengche-moBanYanJiu"
	@git push -u origin master

##############################
# 预览发布文件
##############################
preview-dev:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(DEV_PATH)'
	@rsync -rvI -n --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(DEV_PATH)

preview-prepub:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(PREPUB_PATH)'
	@rsync -rvI -n --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(PREPUB_PATH)

preview-prod:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(ONLINE_PATH)'
	@rsync -rvI -n --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(ONLINE_PATH)

##############################
# 发布
##############################
publish-dev:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(DEV_PATH)'
	rsync -rvI --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(DEV_PATH)
	@echo "Please visit http://f2e.souche.com/projects/dafengche/moBanYanJiu"

publish-prepub:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(PREPUB_PATH)'
	rsync -rvI --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(PREPUB_PATH)
	@echo "Please visit http://f2e.prepub.souche.com/projects/dafengche/moBanYanJiu"

publish-prod:
	@ssh $(REMOTE_SERVER) 'mkdir -p $(ONLINE_PATH)'
	rsync -rvI --delete-after --progress $(SOURCE_FILES) $(REMOTE_SERVER):$(ONLINE_PATH)
	@echo "Please visit http://f2e-assets.souche.com/projects/dafengche/moBanYanJiu"

.PHONY: publish-dev publish-prepub publish-prod preview-dev preview-prepub preview-prod init-git
