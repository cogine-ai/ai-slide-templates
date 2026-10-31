# 六套模板制作与验收记录

2026-11-01，Asia/Taipei。此次按用户确定的六个来源制作 **6 套、154 页**，保留原版全部页面及顺序；页数包含布局变体，不等于 154 种独立布局。模板库合计 **74 套、979 页**。本记录描述提交审阅的版本；代码验证与第三方源设计、素材授权分开记录，不代表已经部署或完成全部素材权属审计。

| 模板 | 页数 | 成品 | 主要结构 |
| --- | ---: | --- | --- |
| Press Kit Editorial | 24 | [template.html](../templates/press-kit-editorial/template.html) | 品牌封面、目录、事实、团队、媒体评价、下载与联络 |
| Interior Design Editorial | 35 | [template.html](../templates/interior-design-editorial/template.html) | 摄影叙事、服务、时间线、方案、报价、合同与资源 |
| Fashion Editorial Lookbook | 22 | [template.html](../templates/fashion-editorial-lookbook/template.html) | 圆形裁图、拼贴、竖排说明、系列故事与摄影资源 |
| Design Review Grid | 35 | [template.html](../templates/design-review-grid/template.html) | 评审议程、产品设备框、反馈矩阵、决策与下一步 |
| Research Readout Pastel | 20 | [template.html](../templates/research-readout-pastel/template.html) | 研究背景、方法、发现、机会、建议与单人对齐演示 |
| Personal Branding Playful | 18 | [template.html](../templates/personal-branding-playful/template.html) | 个性化介绍、定位、客户反馈、服务、作品与联络 |

六套均有完整 `template.json`、`layout_slots`、`data-slot`、容量建议与来源声明。每套 HTML 独立运行，文字和图形为原生 HTML/SVG，照片为独立替换元素，字体和媒体离线内嵌；没有把整页预览截图充作幻灯片背景。

## 实现依据与差异

四套 Pitch 模板逐页读取公开播放器的 DOM/CSS、字体与独立媒体。保留原版 1920×1080 坐标、裁切、形状和配色；Interior / Fashion 保留原字体版本。提交版 Press 使用 OFL Manrope 替代受再分发限制的 Cabinet Grotesk，Personal Branding 的 Hanson 标签改用 OFL Unbounded，保留 Savate / Poppins。替代字体的度量校准与字形差异明确记录，未宣称与原字体逐像素相同。原网站外层播放器由轻量本地导航替代。长篇示例文字改为相近长度的原创演示内容，个人品牌示例使用虚构的 Ari Davis。源截图经过 JPEG 色彩转换，颜色以原 CSS 和原 SVG 值为准，不按截图偏色重配色。

两套 Figma 模板根据官方公开的 **35 / 20 张单页预览**重建 1600×900 原生布局。未取得可编辑 Figma 源文档：点击使用模板需要账号，没有登录、创建账号或绕过访问要求。因此原字体身份和原始 paint 值没有得到验证。字体经视觉比较后实际采用 Design Review 的 **Inter / Tinos**、Research Readout 的 **DM Sans / Roboto Mono**；颜色为预览匹配值。元数据记载实际实现，不将其宣称为原字体或逐像素复刻。

Figma 产品设备框和演示屏幕使用原生 SVG 及虚构 Fieldwork 内容；独立灵感照片与框分别保留。研究数字页的数值与柱高联动，演示值按统一比例生成；数值替换后图形同步更新，约 2–5px 的原预览柱高舍入差另行记录。Research Readout 的对齐输入仅是单人本地交互，可保存至当前浏览器；不连接 Figma，也不提供多人投票。

Personal Branding 的一个带 GIF 标识的来源资产在实际浏览器中交付为单帧 AVIF，成品保留观察到的静态帧，没有声称恢复未见的动画。

## 视觉与运行时验收

验收覆盖原生画布逐页截图、原版与成品对照，以及 1280×720 的仓库视觉检查。原版大字有意裁边与实现溢出分别记录，没有通过缩字、改坐标或放宽验证器隐藏原版裁边。

最终库结构验证 **74 套通过**，既有工具测试 **23/23 通过**；本批 **154 页**的原生尺寸渲染及运行时检查通过。四套通用视觉检查全绿；另外两套保留下文的三处原版裁边标记。研究模板的真实键盘输入、刷新后恢复、九个数字与柱高同步及来源面板交互另行验证通过。

四套 Pitch 模板对照所有可定位源块的坐标与尺寸：

| 模板 | 对照源块 | 最大框差，原生 px |
| --- | ---: | ---: |
| Press Kit | 272 | < 0.016 |
| Interior Design | 410 | < 0.019 |
| Fashion Editorial | 124 | < 0.016 |
| Personal Branding | 226 | < 0.016 |

上述是源框几何差，不是整页像素误差，也不表示改写文案的字形与原文一致。非可见 SVG 定义节点的零尺寸坐标差和文案换行差保留在原始报告中。

验收时发现并修复 Press Kit 末页 SVG 标志继承错误填色、Personal Branding 标题和四个标签的文字碰撞，以及 Interior Design 一段正文失去原 SPAN 颜色的问题。改写文案另在相同实现字体和框内与原文比较实际文字范围，缩短新增整行的正文与标签；替代字体版另做全页复核。源 SVG 资产的原始颜色与样式单独核对，未用 JPEG 截图偏色覆盖源值。

原版有意裁边例外：Press Kit 第 1 页的巨大 Bonne 字标；Interior Design 第 4 页的 About / Gilbert 大字。通用视觉验证器会报告这些元素的范围超界。原 DOM、坐标与源图确认相同裁切，保留设计并记录例外，不将带例外的通用命令写作全绿通过。

最终命令结果和文件 SHA-256 见[验收清单](template-implementation-2026-11-01.acceptance.json)。本记录与清单仅描述实际执行的检查；未做 Windows/Linux、真实移动设备或其它浏览器的兼容验收。合成触摸事件验证只证明翻页处理逻辑，不代表真实触屏设备测试。

## 素材与许可

详见[本批来源与素材声明](template-source-notices-2026-11-01.md)及每套目录的 `SOURCE-NOTICES.md`。受限制的 Cabinet 与条款不完整的 Hanson 字体文件已从提交版移除，替换为具有实际 OFL 许可的 Manrope / Unbounded。两套原字体本地稿另存被 Git 忽略的 `outputs/restricted-template-studies/exact-font-2026-11-01/`，不进入提交。四套 Pitch 原设计及部分独立媒体仍未建立模板级再分发授权；Figma 模板 CC BY 4.0 与外部照片许可分别记录。此风险在 PR 中披露，字体修复不表示整套素材包已获 MIT 再许可。

## 提交前审查修复

审查基线为远端默认分支 `origin/main` 的 `5e0ae93020211bf8b49ead7fe1754e2510da2611`，覆盖本批全部新增文件及 `AGENTS.md` / README 的完整变更。

- 去除 Press / Personal 的两个字体分发阻塞，保留原字体本地稿，提交版采用明确许可的替代字体，并更新元数据、字形度量与来源声明。
- 修复 Research 两种数字布局的短柱标签、说明与描边碰撞，继续支持元数据声明的 0–100%；默认示例结构与统一柱高比例保留。两个尺寸下 0 / 10 / 20 / 100 的 72 组边界用例通过，另有 6 组默认用例，两种默认布局截图均逐像素不变。
- 修正研究快照和提交版文档的状态区分，重新生成最终 HTML 哈希、图库与验收清单。未提交本地来源下载、虚拟环境、临时脚本或受限制原字体稿。

`git diff --cached --check` 对逐字保留的上游字体许可文本（含原始 CRLF）及字体声明版本行报告 106 处空白提示；未将该项记为通过。全部提示均位于这些声明，未发现自编运行代码或元数据的空白问题；保留原许可字节用于来源核验，没有禁用钩子或验证器。

## 本地证据与复验

原工作区统一演示入口为 `previews/template-batch-2026-11-01/index.html`，全部来源数据、截图、几何报告与运行时记录在 `previews/implementation-2026-11-01/`。这些是被 Git 忽略的验收产物，不是成品运行依赖，也不随新克隆提供。README 图库包含六套成品封面。

```sh
node scripts/validate.mjs
node --test scripts/*.test.mjs
node scripts/validate-visual.mjs --template design-review-grid --template research-readout-pastel --template fashion-editorial-lookbook --template personal-branding-playful
# 下列两套的通用视觉检查会报告上文列出的原版有意裁边：
node scripts/validate-visual.mjs --template press-kit-editorial --template interior-design-editorial
```
