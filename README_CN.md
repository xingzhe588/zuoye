# 🎨 ArtCollab - AI艺术协作平台

## 📋 项目简介

ArtCollab是一个基于人工智能的艺术创作平台，采用Feature-Sliced Design (FSD)架构，支持HATEOAS功能管理，提供完整的用户认证和艺术品生成功能。

## ✨ 主要功能

### 🔐 用户认证系统
- **用户注册** - 支持邮箱注册，包含用户名、密码、姓名等信息
- **用户登录** - 基于Token的身份验证
- **个人中心** - 用户资料管理，支持编辑个人信息
- **权限控制** - 未登录用户可免费体验2次，完整功能需要登录

### 🎨 AI艺术生成
- **智能创作** - 使用GigaChat AI根据文本描述生成艺术作品
- **实时预览** - 即时查看生成的艺术品
- **创作指导** - 提供创作建议和示例
- **作品保存** - 支持保存和管理创作的艺术品

### 🖼️ 作品集管理
- **作品浏览** - 展示平台上的优秀艺术作品
- **分类筛选** - 按风格、类型等分类浏览
- **作品详情** - 查看作品详细信息和创作者信息

### 🏗️ FSD架构特性
- **功能切片** - 每个功能模块完全独立
- **动态控制** - 支持运行时开启/关闭功能
- **HATEOAS支持** - RESTful API设计，支持超媒体控制
- **可扩展性** - 易于添加新功能模块

## 🛠️ 技术栈

### 前端技术
- **React 18** - 现代化的用户界面框架
- **TypeScript** - 类型安全的JavaScript超集
- **Redux Toolkit** - 状态管理解决方案
- **React Router** - 客户端路由管理
- **Webpack** - 模块打包工具
- **Jest** - 单元测试框架

### 后端技术
- **Django 5.1** - Python Web框架
- **Django REST Framework** - RESTful API开发
- **SQLite** - 轻量级数据库
- **GigaChat API** - AI文本生成服务
- **CORS支持** - 跨域资源共享

### 架构设计
- **FSD (Feature-Sliced Design)** - 功能切片设计架构
- **HATEOAS** - 超媒体作为应用状态引擎
- **Token认证** - 基于令牌的身份验证
- **响应式设计** - 适配各种设备屏幕

## 📁 项目结构

```
artcollab-master/
├── src/
│   ├── app/                    # 应用层
│   │   ├── providers/          # 全局提供者
│   │   ├── router/             # 路由配置
│   │   └── store.ts            # 全局状态管理
│   ├── features/               # 功能模块
│   │   ├── auth/               # 认证功能
│   │   ├── user-center/        # 用户中心
│   │   └── feature-management/ # 功能管理
│   ├── shared/                 # 共享资源
│   │   ├── api/                # API客户端
│   │   ├── config/             # 配置文件
│   │   ├── ui/                 # 通用UI组件
│   │   └── lib/                # 工具库
│   ├── pages/                  # 页面组件
│   ├── container/              # 容器组件
│   └── assets/                 # 静态资源
├── public/                     # 公共文件
├── build/                      # 构建输出
└── docs/                       # 文档
```

## 🚀 快速开始

### 环境要求
- **Node.js** 16.0+
- **npm** 8.0+
- **Python** 3.8+
- **pip** 最新版本

### 安装步骤

#### 1. 克隆项目
```bash
git clone <repository-url>
cd artcollab-master
```

#### 2. 安装前端依赖
```bash
npm install
```

#### 3. 安装后端依赖
```bash
cd ../artcollab-back-main
pip install -r requirements.txt
```

#### 4. 配置环境变量
```bash
# 在 artcollab-back-main 目录下创建 .env 文件
echo "GIGACHAT_API_KEY=your_api_key_here" > .env
```

#### 5. 数据库迁移
```bash
python manage.py migrate
```

#### 6. 启动后端服务
```bash
python manage.py runserver 8000
```

#### 7. 启动前端服务
```bash
cd ../artcollab-master
npm start
```

#### 8. 访问应用
打开浏览器访问：http://localhost:8099

## 🧪 测试

### 运行所有测试
```bash
npm test
```

### 运行测试并生成覆盖率报告
```bash
npm test -- --coverage
```

### 运行特定测试
```bash
npm test -- --testPathPattern="features.test.ts"
```

## 📦 构建部署

### 生产构建
```bash
npm run build
```

### 本地预览构建结果
```bash
npx serve -s build
```

## 🔧 配置说明

### 功能开关配置
在 `src/shared/config/features.ts` 中配置功能开关：

```typescript
const features = {
  auth: true,           // 认证系统
  userCenter: true,     // 用户中心
  artGeneration: true,  // 艺术生成
  collection: true,     // 作品集
  contact: true,        // 联系页面
  navigation: true      // 导航菜单
};
```

### 路由配置
在 `bro.config.js` 中配置路由：

```javascript
navigations: {
  "artcollab.main": "/artcollab",
  "artcollab.auth": "/artcollab/auth",
  "artcollab.user-center": "/artcollab/user-center",
  "artcollab.create-nft": "/artcollab/create-nft",
  "artcollab.collection": "/artcollab/collection"
}
```

### API配置
```javascript
config: {
  "artcollab.api": "http://localhost:8000"
}
```

## 🎯 使用指南

### 新用户体验
1. **访问主页** - 浏览平台介绍和作品展示
2. **免费体验** - 无需注册即可尝试创建2次艺术品
3. **注册账号** - 获得完整功能访问权限
4. **创建艺术** - 使用AI生成个性化艺术作品
5. **管理作品** - 在个人中心查看和管理创作

### 功能管理
- **动态开关** - 管理员可在运行时开启/关闭功能
- **权限控制** - 不同功能对应不同的访问权限
- **HATEOAS导航** - API自动提供可用操作链接

## 🔍 故障排除

### 常见问题

#### 1. 登录后无法退出
**原因**: 后端API服务未启动
**解决**: 确保Django服务器在8000端口运行

#### 2. 创建艺术品失败
**原因**: GigaChat API密钥未配置
**解决**: 在后端.env文件中添加正确的API密钥

#### 3. 页面显示404错误
**原因**: 路由配置问题
**解决**: 检查bro.config.js中的路由配置

#### 4. 测试失败
**原因**: 依赖版本不匹配
**解决**: 删除node_modules重新安装依赖

### 调试技巧
- 使用浏览器开发者工具查看网络请求
- 检查控制台错误信息
- 查看Redux DevTools了解状态变化
- 使用React DevTools检查组件状态

## 📈 性能优化

### 前端优化
- **代码分割** - 按路由分割代码包
- **懒加载** - 组件按需加载
- **缓存策略** - 合理设置缓存头
- **图片优化** - 使用WebP格式和压缩

### 后端优化
- **数据库索引** - 为常用查询添加索引
- **API缓存** - 缓存频繁访问的数据
- **连接池** - 优化数据库连接管理

## 🤝 贡献指南

### 开发流程
1. Fork项目到个人仓库
2. 创建功能分支
3. 编写代码和测试
4. 提交Pull Request
5. 代码审查和合并

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint配置的代码风格
- 编写单元测试覆盖新功能
- 添加适当的注释和文档

## 📄 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 📞 联系我们

- **项目主页**: [GitHub Repository]
- **问题反馈**: [GitHub Issues]
- **技术支持**: [Email]

---

**🎉 感谢使用ArtCollab！让AI艺术创作变得更简单！**
