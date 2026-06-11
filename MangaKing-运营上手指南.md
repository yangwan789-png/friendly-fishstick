# MangaKing 运营上手指南（1页）

## 1) 标签规范（必须统一）

每个商品（装饰画）至少打 2 个标签：

- IP：`ip:<ip-slug>`
- 角色：`character:<character-slug>`

示例：

- `ip:naruto`
- `character:uzumaki-naruto`
- `character:uchiha-sasuke`

建议（可选）：

- 风格：`style:battle`、`style:dark` 等

要求：

- slug 仅使用小写英文、数字、短横线 `-`
- 不要空格、不要中文、不要特殊符号

## 2) 新增一个 IP（集合页 /collections/<ip-slug>）

1. 后台 → Products → Collections → Create collection
2. 选择 Automated
3. 条件：Product tag is equal to `ip:<ip-slug>`
4. 保存后，把该 collection 的 handle 设置成 `<ip-slug>`（英文）
5. 上传集合封面、写描述（会用于 SEO/集合页顶部展示）
6. Online Store → Navigation，把该 IP collection 加到菜单

## 3) 新增一个角色（无需建新东西）

1. 给任意商品打上新角色标签：`character:<character-slug>`
2. 该角色会自动出现在：
   - 对应 IP 集合页顶部的“角色胶囊筛选”
   - 全站角色页（见第 5 点）

## 4) 上架一款新装饰画商品

1. Products → Add product
2. 填标题、图、价格、库存
3. 标签至少包含：
   - `ip:<ip-slug>`
   - `character:<character-slug>`

## 5) 全站角色页（/pages/characters）

1. Online Store → Pages → Add page
2. 标题建议：Characters
3. Theme template 选择：`page.characters`
4. 保存后，把该页面加到导航（可选）

页面能力：

- 自动汇总全站所有 `character:` 标签
- 支持前端搜索过滤
- 点击角色跳到 `/collections/all/<character-tag-handle>`

## 6) 首页模块怎么加（Theme Editor）

Online Store → Themes → Customize，在首页添加以下分区：

- `MK IP quick links`：配置多个 IP collection 作为入口
- `MK character spotlight`：随机展示角色并跳转到角色结果页

## 7) 验收快速检查

- 任一 IP 集合页能看到角色胶囊筛选，点击后 URL 变成 `/collections/<ip>/<character-...>` 并且商品过滤正确
- 商品详情页标题下方显示 IP/角色徽章，可点击跳转
- `/pages/characters` 能搜到角色并跳转正确

