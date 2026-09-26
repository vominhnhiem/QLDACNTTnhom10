// =========================================================
// packages.js - Quản lý Gói tập (Có sẵn Mock Data & cấu trúc API)
// =========================================================

// Dữ liệu giả lập (Mock Data) chuẩn theo database PACKAGES
let packagesList = [
  { packageID: 1, packageName: "Gói Gym Cơ Bản (1 Tháng)", durationDays: 30, totalSessions: 30, price: 500000, isActive: true },
  { packageID: 2, packageName: "Gói Gym Tiết Kiệm (3 Tháng)", durationDays: 90, totalSessions: 90, price: 1350000, isActive: true },
  { packageID: 3, packageName: "Gói Gym Toàn Diện (1 Năm)", durationDays: 365, totalSessions: 365, price: 4800000, isActive: true },
  { packageID: 4, packageName: "Gói Yoga VIP (3 Tháng)", durationDays: 90, totalSessions: 72, price: 2100000, isActive: true },
  { packageID: 5, packageName: "Gói Thử Nghiệm 7 Ngày", durationDays: 7, totalSessions: 7, price: 150000, isActive: false }
];

// Render bảng danh sách gói tập
function renderPackagesTable(data) {
  const tbody = document.getElementById("table-packages-body");
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 32px;">Không tìm thấy gói tập nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(pkg => `
    <tr>
      <td>#${pkg.packageID}</td>
      <td><strong>${pkg.packageName}</strong></td>
      <td>${pkg.durationDays} ngày</td>
      <td>${pkg.totalSessions} buổi</td>
      <td style="color: #38bdf8; font-weight: 600;">${pkg.price.toLocaleString('vi-VN')} đ</td>
      <td>
        <span class="badge ${pkg.isActive ? 'badge-success' : 'badge-danger'}">
          ${pkg.isActive ? 'Đang bán' : 'Tạm ngưng'}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="openEditPackageModal(${pkg.packageID})">✏️ Sửa</button>
        <button class="btn btn-sm btn-secondary" onclick="togglePackageStatus(${pkg.packageID})" style="margin-left: 6px;">
          ${pkg.isActive ? 'Khóa' : 'Kích hoạt'}
        </button>
      </td>
    </tr>
  `).join('');
}

// Tìm kiếm gói tập
function filterPackages() {
  const keyword = document.getElementById("searchPackageInput").value.toLowerCase().trim();
  const filtered = packagesList.filter(p => p.packageName.toLowerCase().includes(keyword));
  renderPackagesTable(filtered);
}

// Modal Thêm / Sửa
function openCreatePackageModal() {
  document.getElementById("modalTitle").innerText = "Thêm Gói Tập Mới";
  document.getElementById("packageForm").reset();
  document.getElementById("packageId").value = "";
  document.getElementById("packageModal").classList.add("active");
}

function openEditPackageModal(id) {
  const pkg = packagesList.find(p => p.packageID === id);
  if (!pkg) return;

  document.getElementById("modalTitle").innerText = "Chỉnh Sửa Gói Tập #" + id;
  document.getElementById("packageId").value = pkg.packageID;
  document.getElementById("packageName").value = pkg.packageName;
  document.getElementById("durationDays").value = pkg.durationDays;
  document.getElementById("totalSessions").value = pkg.totalSessions;
  document.getElementById("price").value = pkg.price;
  document.getElementById("isActive").value = pkg.isActive ? "true" : "false";

  document.getElementById("packageModal").classList.add("active");
}

function closePackageModal() {
  document.getElementById("packageModal").classList.remove("active");
}

// Lưu Gói tập (Tạo mới hoặc Sửa)
function handleSavePackage(event) {
  event.preventDefault();

  const id = document.getElementById("packageId").value;
  const name = document.getElementById("packageName").value.trim();
  const duration = parseInt(document.getElementById("durationDays").value);
  const sessions = parseInt(document.getElementById("totalSessions").value);
  const price = parseFloat(document.getElementById("price").value);
  const isActive = document.getElementById("isActive").value === "true";

  if (id) {
    // Sửa gói
    const index = packagesList.findIndex(p => p.packageID === parseInt(id));
    if (index !== -1) {
      packagesList[index] = { ...packagesList[index], packageName: name, durationDays: duration, totalSessions: sessions, price: price, isActive: isActive };
      alert("Cập nhật gói tập thành công!");
    }
  } else {
    // Thêm mới
    const newId = packagesList.length > 0 ? Math.max(...packagesList.map(p => p.packageID)) + 1 : 1;
    packagesList.unshift({
      packageID: newId,
      packageName: name,
      durationDays: duration,
      totalSessions: sessions,
      price: price,
      isActive: isActive
    });
    alert("Thêm gói tập mới thành công!");
  }

  closePackageModal();
  renderPackagesTable(packagesList);
}

// Bật / tắt trạng thái gói
function togglePackageStatus(id) {
  const pkg = packagesList.find(p => p.packageID === id);
  if (pkg) {
    pkg.isActive = !pkg.isActive;
    renderPackagesTable(packagesList);
  }
}

// Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", () => {
  renderPackagesTable(packagesList);
});
