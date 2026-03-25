Hướng dẫn cài đặt:

    B1: Clone github về máy
    B2: Chạy lệnh "npm install" để cài đặt thư viện
    B3: Chạy lệnh "npm start" sau đó nhấn "o" để mở trang web

Lưu ý:

- Em sử dụng npm phiên bản 10.8.2, node v20.19.1

- Nếu làm theo cách trên thì website đang kết nối tới tài khoảng db pockethost của em. Nếu Anh/chị muốn chạy trên tài khoản pockethost của riêng mình thì hãy tạo tài khoản (có tốn phí), sau đó cập nhật lại url trong file .env và cài đặt bảng colection theo mẫu sau:

    tasks {
    title: Plain text
    description: Plain text
    deadline: DateTime
    state: Plain text
    priority: Plain text
    complete: DateTime
    }

Quyết định kỹ thuật:
Khi thực hiện dự án, em đặt ra các yêu cầu cá nhân
bao gồm: scale dự án vừa đủ trong deadline 48h, dự án phải gần với thực tế, bản thân có thể sử dụng.

    Một trong trong những vấn đều đầu tiên cần giải quyết đó là scale của dự án, trong khi thời gian thực hiện có hạn, lựa chọn tốt nhất là dự án nên dành cho cá nhân 1 người dùng, điều này giúp tiết kiệm phần lớn thời gian phát triển do nếu chọn scale là multi user thì việc xây dựng các chức năng phân quyền, đăng xuất, đăng nhập, bảo mật, v.v mất rất nhiều thời gian.

    Tiếp theo là chọn mô hình phù hợp cho dự án. Do thời gian chỉ có 48h nên không thể chọn theo mô hình Client-Server vì không đủ thời gian phát triển backend.

    Vấn đề chọn db để lưu trữ dữ liệu. Do mục tiêu ban đầu là dự án phải gần với thực tế và có thể sử dụng được và phải thực hiện trong thời hạn 48h nên việc chọn db là vô cùng quan trọng. Do không xây dựng backend nên không thể sử dụng các db lớn như là SQL, MongoDb. LocalStorage cũng không thể sử dụng được do LocalStorage chỉ lưu trữ trên trình duyệt. Bản thân em muốn người dùng có thể linh hoạt truy cập website để kiểm tra task từ điện thoại hoặc desktop nên nếu chỉ lưu trên trình duyệt thì dữ liệu sẽ không đồng bộ. Do đó cloud là giải pháp phù hợp. Em chọn pocketbase làm db vì có tài khoản sẵn, cài đặt nhanh, dễ sử dụng và thõa mãn các yêu cầu đã đề ra.

    Vấn đề cuối cùng là design. Do design không phải là chuyên môn của em nên em chọn sử dụng AI Stitch để thực hiện. Đây là công cụ dành riêng cho việc thiết kế trang web, đảm bảo giao diện dẹp và thân thiện với người dùng.

Những điểm sẽ cải thiện:

    - Thêm vào chức năng lưu trữ, xem, tải xuống file (image, docx, pptx, pdf) dự .
    - Cải thiện db bằng cách chọn một sử dụng db tốt hơn.
    - Xây dựng chức năng thông báo qua zalo.
    - Tạo một phiên bản app dành cho mobile.
    - Deploy để sử dụng trong thực tế.
    - Nếu cần phải mở rộng dự án sang multi user thì cần xây dựng thêm các chức năng liên quan (đăng nhập, phân quyền, giao task, báo cáo tiến độ, v.v)
