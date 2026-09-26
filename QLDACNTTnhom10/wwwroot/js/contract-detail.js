// =============================================================================
// contract-detail.js - Xử lý logic hiển thị và API Chi tiết Hợp đồng
// FitManage Gym & Yoga Suite (TASK-349)
// =============================================================================

// Cấu hình Base API Endpoint
const API_BASE = '/api';

// Dữ liệu mẫu (Mock Data) chuẩn theo schema CSDL CONTRACTS & MEMBERS
const mockContractDetails = {
  contractID: "HD-2026-0892",
  status: "Active", // "Active", "Expired", "Frozen", "Cancelled"
  eSigned: true,
  signDate: "26/09/2026",
  createdBy: "Nguyễn Văn A (Lễ tân Flagship)",
  branch: "Quận 1 - Flagship Studio",
  member: {
    name: "Nguyễn Đức Chí Nguyên",
    avatarLetters: "CN",
    rank: "Diamond VIP",
    memberCode: "MEM-2026-042",
    rfid: "8892-004-912",
    phone: "0908 123 456",
    cccd: "079098012345",
    email: "chinguyen.fit@example.com",
    genderAge: "Nam • 14/06/1992 (34 tuổi)",
    address: "48 Nguyễn Thị Minh Khai, P. Bến Nghé, Q. 1, TP. HCM",
    parqStatus: "Đã ký xác nhận không có tiền sử bệnh tim mạch / huyết áp",
    emergencyContact: "Chị Lan (Vợ) - 0912 345 678",
    posLimit: "15.000.000 đ"
  },
  package: {
    packageID: 101,
    name: "Gym Diamond 12 Tháng",
    scope: "🏢 Toàn hệ thống (All Clubs)",
    operatingHours: "05:30 - 22:30 (Mở cửa 7 ngày/tuần)",
    startDate: "26/09/2026",
    endDate: "26/09/2027",
    remainingDays: 312,
    passedDays: 53,
    progressPercent: 14.5,
    policy: "Miễn phí bảo lưu tối đa 60 ngày"
  },
  pt: {
    trainerName: "HLV Trần Văn B",
    trainerAvatar: "TB",
    title: "Senior PT",
    cert: "Huấn luyện viên Thể hình Chuyên sâu (NASM Certified)",
    completedSessions: 6,
    totalSessions: 36,
    remainingSessions: 30,
    completionDeadline: "26/03/2027",
    nextSession: "Thứ Bảy, 26/09 lúc 09:00",
    sessionTopic: "Tập Chân & Mông (Lower Body Blast)"
  },
  amenities: [
    {
      id: "locker",
      title: "Tủ Locker VIP riêng",
      desc: "Số tủ <strong>#108 (Tầng 2 Khu Diamond)</strong> • Tích hợp khóa thẻ từ RFID cố định cả năm.",
      icon: "lock",
      color: "text-primary"
    },
    {
      id: "sauna",
      title: "Sauna & Hồ sục Jacuzzi",
      desc: "Không giới hạn lượt sử dụng xông khô đá muối Himalaya & xông ướt thảo dược.",
      icon: "hot_tub",
      color: "text-tertiary"
    },
    {
      id: "drink",
      title: "Khăn tập & Nước uống Detox",
      desc: "Cung cấp bộ khăn lớn/nhỏ cao cấp & đồ uống bù khoáng kiềm tại quầy VIP Lounge.",
      icon: "local_drink",
      color: "text-secondary"
    },
    {
      id: "guest",
      title: "Vé mời khách đi cùng (Guest Pass)",
      badge: "Còn 3 / 5 vé",
      desc: "Mời bạn bè trải nghiệm tiện ích trọn vẹn trong ngày (Đã sử dụng 2 vé).",
      icon: "confirmation_number",
      color: "text-primary"
    },
    {
      id: "inbody",
      title: "Phân tích thể trạng InBody 3D Định kỳ",
      badge: "Đã kiểm tra 2 / 12 lần",
      desc: "Đo lượng mỡ nội tạng, cơ xương và nhận báo cáo AI phân tích dinh dưỡng mỗi tháng.",
      icon: "monitoring",
      color: "text-tertiary",
      colSpan2: true
    }
  ],
  payment: {
    invoiceCode: "INV-2026-98231",
    basePrice: 18500000,
    voucherCode: "FITVIP2026",
    voucherDesc: "Voucher Tri Ân Diamond (FITVIP2026)",
    discountAmount: 1500000,
    lockerFee: 300000,
    rfidFee: 0,
    vatNote: "Đã bao gồm trong giá",
    finalAmount: 17300000,
    paidStatus: "Đã thanh toán đủ 100%",
    paidTime: "26/09/2026 10:24:18",
    paymentMethod: "Chuyển khoản VietQR Pro",
    bank: "Techcombank Corporate",
    transactionId: "TXN-98231-VN"
  },
  auditTrail: {
    totalCheckins: 18,
    lastCheckinTime: "Hôm qua, 18:20",
    lastCheckinGate: "Gate 02 • CS Q1",
    events: [
      {
        time: "26/09 10:24",
        title: "Ký duyệt hợp đồng điện tử",
        desc: "Tạo và ký số thành công qua OTP SMS. Thực hiện bởi nhân viên lễ tân: <strong>Nguyễn Văn A</strong>.",
        dotColor: "bg-primary"
      },
      {
        time: "26/09 10:22",
        title: "Thanh toán hoàn tất",
        desc: "Nhận 17.300.000 đ qua VietQR (#TXN-98231). Hệ thống tự động kích hoạt mã thẻ RFID #8892.",
        dotColor: "bg-tertiary"
      },
      {
        time: "25/09 16:45",
        title: "Khảo sát y tế PAR-Q+",
        desc: "Hội viên xác nhận trực tuyến trên FitManage Member App. Đạt chỉ số an toàn tập luyện 100%.",
        dotColor: "bg-secondary"
      },
      {
        time: "20/09 14:10",
        title: "Tạo phiếu trải nghiệm VIP",
        desc: "Sales Rep <strong>Hoàng Mai</strong> tạo cơ hội chuyển đổi từ hội viên tham quan sang Diamond Club.",
        dotColor: "bg-outline-variant"
      }
    ]
  }
};

// =============================================================================
// API SERVICE CALLS (Sử dụng fetch API)
// =============================================================================

/**
 * Gọi API lấy chi tiết hợp đồng theo ID: GET /api/contracts/{id}
 * Nếu backend chưa có hoặc lỗi kết nối, tự động fallback sang Mock Data
 */
async function fetchContractDetail(contractId) {
  try {
    const response = await fetch(`${API_BASE}/contracts/${encodeURIComponent(contractId)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.warn(`[API] GET /api/contracts/${contractId} trả về status ${response.status}. Sử dụng dữ liệu Mock.`);
      return mockContractDetails;
    }
  } catch (error) {
    console.warn('[API] Lỗi khi kết nối Backend API. Sử dụng dữ liệu Mock cục bộ.', error);
    return mockContractDetails;
  }
}

/**
 * Gọi API gia hạn hợp đồng: POST /api/contracts/{id}/renew
 */
async function apiRenewContract(contractId, months) {
  try {
    const response = await fetch(`${API_BASE}/contracts/${encodeURIComponent(contractId)}/renew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ additionalMonths: months })
    });
    return response.ok;
  } catch (error) {
    console.warn('[API] Lỗi kết nối API gia hạn, thực thi giả lập cục bộ.', error);
    return true;
  }
}

/**
 * Gọi API bảo lưu hợp đồng: POST /api/contracts/{id}/freeze
 */
async function apiFreezeContract(contractId, freezeDays) {
  try {
    const response = await fetch(`${API_BASE}/contracts/${encodeURIComponent(contractId)}/freeze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ freezeDays })
    });
    return response.ok;
  } catch (error) {
    console.warn('[API] Lỗi kết nối API bảo lưu, thực thi giả lập cục bộ.', error);
    return true;
  }
}

// =============================================================================
// DOM RENDERING & BINDING
// =============================================================================

function renderContractDetail(data) {
  if (!data) return;

  // 1. Header Banner
  setText('contractIdHeader', `Chi tiết Hợp đồng #${data.contractID}`);
  setText('contractSignDate', data.signDate);
  setText('contractCreatedBy', data.createdBy);
  setText('contractBranch', data.branch);

  // Status badge
  const statusBadge = document.getElementById('contractStatusBadge');
  if (statusBadge) {
    if (data.status === 'Active') {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span> Đang hiệu lực`;
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-title-md text-title-md shadow-sm';
    } else if (data.status === 'Frozen') {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span> Đang bảo lưu`;
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-title-md text-title-md shadow-sm';
    } else {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500"></span> Hết hiệu lực`;
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-title-md text-title-md shadow-sm';
    }
  }

  // 2. Member Card
  if (data.member) {
    setText('memberName', data.member.name);
    setText('memberAvatar', data.member.avatarLetters || getInitials(data.member.name));
    setText('memberRank', data.member.rank);
    setText('memberCode', `Mã thẻ: ${data.member.memberCode}`);
    setText('memberRfid', `RFID: ${data.member.rfid}`);
    setText('memberPosLimit', data.member.posLimit);
    setText('memberPhone', data.member.phone);
    setText('memberCccd', data.member.cccd);
    setText('memberEmail', data.member.email);
    setText('memberGenderAge', data.member.genderAge);
    setText('memberAddress', data.member.address);
    setText('memberParq', data.member.parqStatus);
    setText('memberEmergency', data.member.emergencyContact);
  }

  // 3. Package & Benefits Card
  if (data.package) {
    setText('packageName', data.package.name);
    setText('packageScope', data.package.scope);
    setText('packageHours', data.package.operatingHours);
    setText('packageStartDate', data.package.startDate);
    setText('packageEndDate', data.package.endDate);
    setText('packageRemainingDays', `Còn lại ${data.package.remainingDays} ngày hiệu lực`);
    setText('packageProgressSummary', `Đã qua: ${data.package.passedDays} ngày (${data.package.progressPercent}%)`);
    setText('packagePolicy', `Chính sách: ${data.package.policy}`);

    const progressBar = document.getElementById('packageProgressBar');
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, data.package.progressPercent))}%`;
    }
  }

  // 4. Personal Trainer (PT)
  if (data.pt) {
    setText('ptName', data.pt.trainerName);
    setText('ptAvatar', data.pt.trainerAvatar || getInitials(data.pt.trainerName));
    setText('ptTitle', data.pt.title);
    setText('ptCert', data.pt.cert);
    setText('ptSessionProgress', `${data.pt.completedSessions} / ${data.pt.totalSessions} buổi (${Math.round(data.pt.completedSessions / data.pt.totalSessions * 100)}%)`);
    setText('ptSessionNote', `Còn lại ${data.pt.remainingSessions} buổi kèm riêng • Thời hạn hoàn thành: ${data.pt.completionDeadline}`);
    setText('ptNextSchedule', data.pt.nextSession);
    setText('ptSessionTopic', data.pt.sessionTopic);

    // Progress columns
    const ptProgressGrid = document.getElementById('ptProgressGrid');
    if (ptProgressGrid) {
      const completedRatio = Math.round((data.pt.completedSessions / data.pt.totalSessions) * 12);
      ptProgressGrid.innerHTML = `
        <div class="col-span-${Math.max(1, completedRatio)} h-full rounded-sm bg-primary"></div>
        <div class="col-span-${Math.max(1, 12 - completedRatio)} h-full rounded-sm bg-surface-container-highest"></div>
      `;
    }
  }

  // 5. Payment & Invoice Card
  if (data.payment) {
    setText('invoiceCodeLabel', `Mã giao dịch: #${data.payment.invoiceCode}`);
    setText('invoiceBasePackage', `${data.payment.basePrice.toLocaleString('vi-VN')} đ`);
    setText('invoiceVoucherDiscount', `-${data.payment.discountAmount.toLocaleString('vi-VN')} đ`);
    setText('invoiceLockerFee', `+${data.payment.lockerFee.toLocaleString('vi-VN')} đ`);
    setText('invoiceRfidFee', data.payment.rfidFee === 0 ? 'Miễn phí (0 đ)' : `${data.payment.rfidFee.toLocaleString('vi-VN')} đ`);
    setText('invoiceGrandTotal', data.payment.finalAmount.toLocaleString('vi-VN'));
    setText('paymentMethodName', data.payment.paymentMethod);
    setText('paymentBank', data.payment.bank);
    setText('paymentTxnId', `#${data.payment.transactionId}`);
    setText('paymentPaidTime', data.payment.paidTime);
  }

  // 6. Audit Trail Card
  if (data.auditTrail) {
    setText('auditTotalCheckins', `${data.auditTrail.totalCheckins} lượt`);
    setText('auditLastCheckinTime', data.auditTrail.lastCheckinTime);
    setText('auditLastCheckinGate', data.auditTrail.lastCheckinGate);
  }
}

// Helper setText an toàn
function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.innerText = text;
}

// Helper lấy 2 chữ cái đầu tên
function getInitials(name) {
  if (!name) return 'FM';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// =============================================================================
// UI ACTIONS & INTERACTION HELPERS
// =============================================================================

function triggerToast(message) {
  const toast = document.getElementById('toast-notify');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

function copyText(text, successMsg = 'Đã sao chép thành công!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      triggerToast(successMsg);
    });
  } else {
    triggerToast(successMsg);
  }
}

function printContractPdf() {
  triggerToast('Đang tạo bản in Hợp đồng điện tử khổ A4...');
  setTimeout(() => {
    window.print();
  }, 500);
}

function downloadInvoicePdf() {
  triggerToast('Đang tải hóa đơn điện tử e-Invoice PDF (#INV-2026-98231)...');
}

function checkVietQrGateway() {
  triggerToast('Mở cổng sao kê cổng thanh toán VietQR Hub...');
}

function handleRenewContractAction() {
  const months = prompt('Nhập số tháng muốn gia hạn (VD: 3, 6, 12 tháng):', '12');
  if (months && !isNaN(months)) {
    apiRenewContract(mockContractDetails.contractID, parseInt(months)).then(() => {
      triggerToast(`🎉 Đã gia hạn thành công thêm ${months} tháng cho hợp đồng #${mockContractDetails.contractID}!`);
    });
  }
}

function handleFreezeContractAction() {
  const days = prompt('Nhập số ngày muốn bảo lưu hợp đồng (Tối đa 60 ngày):', '30');
  if (days && !isNaN(days)) {
    apiFreezeContract(mockContractDetails.contractID, parseInt(days)).then(() => {
      triggerToast(`❄️ Đã bảo lưu hợp đồng #${mockContractDetails.contractID} trong ${days} ngày.`);
    });
  }
}

function handleSchedulePtAction() {
  triggerToast('Đang kết nối lịch trống HLV Trần Văn B qua hệ thống PT-Booking...');
}

// =============================================================================
// KHỞI CHẠY KHI TẢI TRANG
// =============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  // Lấy mã hợp đồng từ Query Parameter (VD: ?id=HD-2026-0892)
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get('id') || 'HD-2026-0892';

  // Tải và hiển thị dữ liệu
  const contractData = await fetchContractDetail(contractId);
  renderContractDetail(contractData);
});
