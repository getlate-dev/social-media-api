# @getlate/social-media-api

Drop-in replacement for the [Ayrshare](https://www.ayrshare.com/) `social-media-api` SDK, powered by [Late](https://getlate.dev).

## Migration

```bash
npm uninstall social-media-api
npm install @getlate/social-media-api
```

Then update your import:

```diff
- import SocialMediaAPI from 'social-media-api';
+ import SocialMediaAPI from '@getlate/social-media-api';

const social = new SocialMediaAPI('your_late_api_key');
```

That's it. All method signatures are identical to the Ayrshare SDK.

## Get Your API Key

1. Sign up at [getlate.dev](https://getlate.dev)
2. Go to Settings > API Keys
3. Create a new API key

## Example

```typescript
import SocialMediaAPI from '@getlate/social-media-api';

const social = new SocialMediaAPI('your_late_api_key');

// Post to multiple platforms
const result = await social.post({
  post: "Check out Late - social media scheduling for developers!",
  platforms: ["twitter", "instagram", "linkedin"],
  mediaUrls: ["https://example.com/image.jpg"],
});

// Get post history
const history = await social.history({ lastRecords: 10 });

// Upload media
const upload = await social.upload({
  file: base64EncodedFile,
  fileName: "photo.jpg",
});
```

## Supported Methods

All Ayrshare SDK methods are supported. Features not yet available in Late return a 501 status with a descriptive message.

| Category | Methods |
|----------|---------|
| Posts | `post`, `delete`, `getPost`, `retryPost`, `updatePost` |
| History | `history` |
| User | `user` |
| Profiles | `createProfile`, `deleteProfile`, `updateProfile`, `getProfiles` |
| Media | `upload`, `media`, `mediaUploadUrl`, `verifyMediaExists` |
| Analytics | `analyticsPost`, `analyticsSocial` |
| Comments | `postComment`, `getComments`, `deleteComments`, `replyComment` |
| Webhooks | `registerWebhook`, `unregisterWebhook`, `listWebhooks` |
| Scheduling | `setAutoSchedule`, `deleteAutoSchedule`, `listAutoSchedule` |
| Hashtags | `checkBannedHashtags` |

## License

MIT
