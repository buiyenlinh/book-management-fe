<template>
  <div class="author">
    <h4>Danh sách tác giả</h4>

     <div class="d-flex justify-content-between">
      <div class="search-Book" style="width: 30%">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control rounded-0" placeholder="Nhập tên...">
          <div class="input-group-append">
            <button class="btn btn-info rounded-0 btn-sm">Tìm</button>
          </div>
        </div>
      </div>
      <div class="add-Book">
        <button class="btn btn-info btn-sm rounded-0" data-toggle="modal" data-target="#add-update-book-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Ngôn ngữ</th>
          <th>Nhà xuất bản</th>
          <th>Loại sách</th>
          <th>Người tạo</th>
          <th>Ngày tạo</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in bookList?.data" :key="item.id">
            <td>{{ item?.title }}</td>
            <td>{{ item?.author?.fullname }}</td>
            <td>{{ item?.language }}</td>
            <td>{{ item?.producer }}</td>
            <td>{{ item?.category?.name }}</td>
            <td>{{ item?.username }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>
              <b class="text-primary mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#watch-book-id">Xem</b>

              <b class="text-info mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#add-update-book-id">Sửa</b>

              <b class="text-danger mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#delete-book-id">Xóa</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="bookList.meta"  :nameRoute="'Book'"/>
  </div>
  <AddUpdate :itemBook="itemBook" />
  <DeleteBook :itemBook="itemBook" />
  <WatchBook :itemBook="itemBook" />
</template>
