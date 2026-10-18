import axiosClient from './axiosClient';

// Fallback search data matching schema
export const fallbackNewsResponse = {
  code: 'SUCCESS',
  message: 'Success',
  debug: null,
  requestId: '37856f8e87db4ab6bf1285b70cafba61',
  serverTime: '2026-10-18T06:39:05.665803952Z',
  pageNumber: 0,
  pageSize: 4,
  totalElements: 4,
  totalPages: 1,
  data: [
    {
      id: 76,
      title: 'Năm công viên chủ đề thần tiên mở ra vạn trải nghiệm sống đáng giá cho riêng cư dân Vịnh Tiên',
      shortContent: 'Phân khu Vịnh Tiên sở hữu hệ thống năm công viên chủ đề độc đáo rộng gần 8 ha, bao gồm công viên Nắng Tiên năng động, Địa Đàng nghỉ dưỡng riêng tư, Tiên Cảnh mang phong cách resort, Sức Khỏe chuyên tổ hợp thể thao và Dưỡng Lành tĩnh tại, kiến tạo đặc quyền sống trọn vẹn và đẳng cấp cho cư dân',
      createdAt: '2026-09-05T11:06:14.708876Z',
      fileInfo: {
        id: 936,
        code: '55a4c316-de64-4c24-a0f4-6176806ade89',
        fileName: '55a4c316-de64-4c24-a0f4-6176806ade89.png',
        originalName: '258cea07-8483-4d9a-a071-d6c417aa264e.png',
        filePath: '2026/09/05/55a4c316-de64-4c24-a0f4-6176806ade89.png',
        fileSize: 2517203,
        contentType: 'image/png',
        isPublic: true,
        fileExtension: 'png',
        isTemp: false,
        refId: 76,
        refType: 'NEWS',
        refCode: 'NEWS_THUMBNAIL',
        fullLink: 'https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/55a4c316-de64-4c24-a0f4-6176806ade89.png',
      },
    },
    {
      id: 64,
      title: 'Vinhomes Green City – Điểm Sáng Mới Trên Thị Trường Bất Động Sản Tại Thị Trường Việt Nam, Một Trong Những Dự Án Lớn Nhất Trong Thị Trường Bất Động Sản Ở Việt Nam',
      shortContent: 'Vinhomes Green City là dự án đô thị hiện đại được quy hoạch đồng bộ với hệ thống tiện ích cao cấp, không gian sống xanh và hạ tầng kết nối thuận tiện. Dự án hứa hẹn trở thành lựa chọn lý tưởng cho cư dân và nhà đầu tư trong giai đoạn phát triển mới của thị trường bất động sản.',
      createdAt: '2026-06-13T01:08:49.524048Z',
      fileInfo: {
        id: 391,
        code: '207f779c-8443-4f2f-a5f3-2d2543b41571',
        fileName: '207f779c-8443-4f2f-a5f3-2d2543b41571.jpg',
        originalName: 'vinhome-green-city.jpg',
        filePath: '2026/06/13/207f779c-8443-4f2f-a5f3-2d2543b41571.jpg',
        fileSize: 736510,
        contentType: 'image/jpeg',
        isPublic: true,
        fileExtension: 'jpg',
        isTemp: false,
        refId: 64,
        refType: 'NEWS',
        refCode: 'NEWS_THUMBNAIL',
        fullLink: 'https://cdn-s3-uat.vinhomes.biz.vn/2026/06/13/207f779c-8443-4f2f-a5f3-2d2543b41571.jpg',
      },
    },
    {
      id: 49,
      title: 'Hải Vân Bay – “Thiên đường ẩn cư” mới giữa núi, rừng và vịnh biển nguyên sơ',
      shortContent: 'Những vùng đất nơi núi, rừng và biển nguyên sơ giao hòa luôn có sức hấp dẫn đặc biệt với giới tinh hoa toàn cầu – những người đang tìm kiếm một không gian sống khác biệt để gắn bó lâu dài. Tại Việt Nam, một vùng vịnh nằm dưới chân “thiên hạ đệ nhất hùng quan” Hải Vân đang dần trở thành tâm điểm chú ý của thị trường bất động sản cao cấp.',
      createdAt: '2026-04-12T01:27:40.232285Z',
      fileInfo: {
        id: 127,
        code: '2dc2832e-cfaf-4748-8ed4-84ce99f0460c',
        fileName: '2dc2832e-cfaf-4748-8ed4-84ce99f0460c.jpg',
        originalName: 'HaiVanBay_news1.jpg',
        filePath: '2026/04/12/2dc2832e-cfaf-4748-8ed4-84ce99f0460c.jpg',
        fileSize: 179146,
        contentType: 'image/jpeg',
        isPublic: true,
        fileExtension: 'jpg',
        isTemp: false,
        refId: 49,
        refType: 'NEWS',
        refCode: 'NEWS_THUMBNAIL',
        fullLink: 'https://cdn-s3-uat.vinhomes.biz.vn/2026/04/12/2dc2832e-cfaf-4748-8ed4-84ce99f0460c.jpg',
      },
    },
    {
      id: 34,
      title: 'Song lập Bạch Vân – Lakeside Villas: An cư nghỉ dưỡng, vận hành hai dòng tiền, đón ba tầng tăng giá bền vững',
      shortContent: 'Mở ra chuẩn sống nghỉ dưỡng giữa lòng đại đô thị biển, biệt thự song lập Bạch Vân tại Vinhomes Hải Vân Bay hội tụ trọn vẹn giá trị của một tài sản thấp tầng ven biển khan hiếm với pháp lý sở hữu lâu dài. Không chỉ đáp ứng nhu cầu an cư đẳng cấp, dòng sản phẩm này còn mang đến khả năng khai thác linh hoạt với hai dòng tiền và dư địa tăng trưởng dài hạn, được ví như “vàng ròng màu xanh” tại lõi cực phát triển mới phía Tây Bắc Đà Nẵng.',
      createdAt: '2026-04-09T15:18:14.537261Z',
      fileInfo: {
        id: 88,
        code: '90a76fe0-68ac-4a58-a422-2effb04b6cdf',
        fileName: '90a76fe0-68ac-4a58-a422-2effb04b6cdf.jpg',
        originalName: 'BachVan_news.jpg',
        filePath: '2026/04/09/90a76fe0-68ac-4a58-a422-2effb04b6cdf.jpg',
        fileSize: 419634,
        contentType: 'image/jpeg',
        isPublic: true,
        fileExtension: 'jpg',
        isTemp: false,
        refId: 34,
        refType: 'NEWS',
        refCode: 'NEWS_THUMBNAIL',
        fullLink: 'https://cdn-s3-uat.vinhomes.biz.vn/2026/04/09/90a76fe0-68ac-4a58-a422-2effb04b6cdf.jpg',
      },
    },
  ],
};

// Fallback detail data matching user provided schema
export const fallbackNewsDetail = {
  id: 76,
  title: 'Năm công viên chủ đề thần tiên mở ra vạn trải nghiệm sống đáng giá cho riêng cư dân Vịnh Tiên',
  fileInfo: {
    id: 936,
    code: '55a4c316-de64-4c24-a0f4-6176806ade89',
    fileName: '55a4c316-de64-4c24-a0f4-6176806ade89.png',
    originalName: '258cea07-8483-4d9a-a071-d6c417aa264e.png',
    filePath: '2026/09/05/55a4c316-de64-4c24-a0f4-6176806ade89.png',
    fileSize: 2517203,
    contentType: 'image/png',
    isPublic: true,
    fileExtension: 'png',
    isTemp: false,
    refId: 76,
    refType: 'NEWS',
    refCode: 'NEWS_THUMBNAIL',
    fullLink: 'https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/55a4c316-de64-4c24-a0f4-6176806ade89.png',
  },
  fileInfoList: [],
  content: `<p>Tại Vịnh Tiên, cư dân được bao quanh bởi vô vàn trải nghiệm sống động hấp dẫn, nổi bật là bộ năm công viên tiện ích xanh theo chủ đề, nơi mỗi không gian mang đến một đặc quyền sống hoàn toàn khác biệt.</p>
<p>Công viên Nắng Tiên rộng 1.8 ha là miền sống giàu năng lượng, nơi trẻ em được tự do khám phá còn người lớn thỏa sức vận động với đa dạng tiện ích như khu gympark, không gian camping và vườn BBQ, tạo nên những ký ức gắn kết đẹp đẽ cho cả gia đình.</p>
<p><img src="https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/df65040f-80b4-4a0b-95a0-33b3028841c4.png" alt="" width="100%" height="100%"></p>
<p>Công viên Địa Đàng rộng 1.4 ha mang đến kỳ nghỉ riêng tư ngay bên thềm nhà giữa quần thể villa, tích hợp bể bơi cổ điển, khu gym, sân chơi, vườn cờ và hệ thống chòi BBQ phục vụ cho các buổi tiệc sum vầy hoặc không gian thư giãn cá nhân.</p>
<p><img src="https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/10669dea-6c6f-4be3-86ac-413221594d98.png" alt="" width="100%" height="100%"></p>
<p>Công viên Tiên Cảnh rộng 2.05 ha là không gian lớn nhất với cảnh sắc bồng lai và trải nghiệm chuẩn resort, biến mỗi ngày cuối tuần thành kỳ nghỉ tại gia nhờ bể bơi resort, suối cảnh quan, cầu gỗ, sàn ngắm cảnh, sân chơi trẻ em, thảm cỏ đa năng cùng vườn BBQ.</p>
<p><img src="https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/eef23b6b-3708-4490-8da6-43eaeed1edaf.png" alt="" width="100%" height="100%"></p>
<p>Công viên Sức Khỏe rộng 1.9 ha biến thể thao thành nhịp sống thường ngày thông qua tổ hợp vận động phong phú bao gồm sân tennis, bóng rổ, pickleball, cầu lông, bóng chuyền, sân gym và sân vận động liên hoàn để sức khỏe được vun bồi tự nhiên.</p>
<p><img src="https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/ddf45056-5b14-4951-8a2c-0e8c25bd9cf7.png" alt="" width="100%" height="100%"></p>
<p>Công viên Dưỡng Lành rộng 0.9 ha là miền tĩnh tại để thân tâm hồi phục với thế giới an yên từ hồ cá Koi, vườn Zen, vườn trà, chòi thưởng trà ven hồ, sàn ngắm cảnh, suối mơ, bãi cỏ thiền định, yoga, sân gym mini và khu vui chơi cho trẻ nhỏ.</p>
<p><img src="https://cdn-s3-uat.vinhomes.biz.vn/2026/09/05/288a8535-faf9-47c5-916d-875f9675cd3c.png" alt="" width="100%" height="100%"></p>`,
  shortContent: 'Phân khu Vịnh Tiên sở hữu hệ thống năm công viên chủ đề độc đáo rộng gần 8 ha, bao gồm công viên Nắng Tiên năng động, Địa Đàng nghỉ dưỡng riêng tư, Tiên Cảnh mang phong cách resort, Sức Khỏe chuyên tổ hợp thể thao và Dưỡng Lành tĩnh tại, kiến tạo đặc quyền sống trọn vẹn và đẳng cấp cho cư dân',
  projectId: 66,
  projectName: 'VINHOMES GREEN PARADISE',
  createdAt: '2026-09-05T11:06:14.708876Z',
  updatedAt: '2026-09-07T17:42:33.441680Z',
  updatedByName: 'Nguyễn Văn B',
};

/**
 * Fetch news list from /portal/news/search
 * @param {Object} params - { pageNumber, pageSize, sort, projectId, title }
 */
export const searchNews = async (params = {}) => {
  try {
    const cleanParams = {
      pageNumber: params.pageNumber ?? 0,
      pageSize: params.pageSize ?? 12,
      sort: params.sort || 'createdAt:desc',
    };

    if (params.projectId !== undefined && params.projectId !== null && params.projectId !== '') {
      cleanParams.projectId = params.projectId;
    }

    if (params.title && typeof params.title === 'string' && params.title.trim()) {
      cleanParams.title = params.title.trim();
    }

    const response = await axiosClient.get('/portal/news/search', { params: cleanParams });
    if (response && response.data) {
      return response;
    }
    return fallbackNewsResponse;
  } catch (error) {
    console.warn('[searchNews API Error, using fallback data]:', error);
    return fallbackNewsResponse;
  }
};

/**
 * Fetch project list from /portal/projects/search
 * @param {Object} params - { name, pageSize }
 */
export const searchProjects = async (params = {}) => {
  try {
    const cleanParams = {
      pageSize: params.pageSize || 20,
    };
    if (params.name && params.name.trim()) {
      cleanParams.name = params.name.trim();
    }
    const response = await axiosClient.get('/portal/projects/search', { params: cleanParams });
    if (response && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[searchProjects API Error]:', error);
    return [];
  }
};

/**
 * Fetch single news detail from /portal/news/detail
 * @param {number|string} id - News ID
 */
export const getNewsDetail = async (id) => {
  try {
    const response = await axiosClient.get('/portal/news/detail', {
      params: { id },
    });
    if (response && response.data) {
      return response.data;
    }
    return fallbackNewsDetail;
  } catch (error) {
    console.warn(`[getNewsDetail API Error for ID ${id}, using fallback]:`, error);
    return fallbackNewsDetail;
  }
};
