function Mai() {
  return (
    <>
      <div className="p-4 flex flex-col bg-gray-100 h-full">
        <label className="text-2xl font-bold mb-5">ห้องประชุม</label>
        <div className="my-3">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out"
          >
            เพิ่มห้องประชุม +
          </button>
        </div>

        <div className="flex flex-row my-2">
          <div className="rounded-lg bg-white w-72 shadow-lg mx-1">
            <img
              className="rounded"
              src="https://spaces.imgix.net/mediaFiles/ZS82LzUvZS9lNjVlZjNlMTBiYWFkNGRmMTE2ZjAwNjk1ODYxZDk1OTgwOWFmNTY5X1NwYWNlc19DaGFtY2h1cmlfU3F1YXJlX0Jhbmdrb2tfNDgxN19tZWV0aW5nX3Jvb20uanBnL2Rvd25sb2Fk?auto=compress,format&q=30"
              alt=""
            />
            <div className="p-6">
              <label className="text-gray-900 text-xl font-medium mb-2">
                ห้องประชุม 1
              </label>
              <p className="text-gray-700 text-base mb-4">ขนาดห้อง: เล็ก</p>
              <p className="text-gray-700 text-base mb-4">ความจุ: 30 คน</p>
              <div className="flex flex-row mb-4">
                <p className="text-gray-700 text-base mb-4 pr-2">สถานะ:</p>
                <p className="text-green-500 text-base mb-4 pr-2">
                  พร้อมใช้งาน
                </p>
              </div>
              <div className="flex flex-row justify-end">
                <button
                  type="button"
                  className="inline-block mx-2 px-6 py-2.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-150 ease-in-out"
                >
                  แก้ไข
                </button>
                <button
                  type="button"
                  className="inline-block mx-2 px-6 py-2.5 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white w-72 shadow-lg mx-1">
            <img
              className="rounded"
              src="https://spaces.imgix.net/mediaFiles/ZS82LzUvZS9lNjVlZjNlMTBiYWFkNGRmMTE2ZjAwNjk1ODYxZDk1OTgwOWFmNTY5X1NwYWNlc19DaGFtY2h1cmlfU3F1YXJlX0Jhbmdrb2tfNDgxN19tZWV0aW5nX3Jvb20uanBnL2Rvd25sb2Fk?auto=compress,format&q=30"
              alt=""
            />
            <div className="p-6">
              <label className="text-gray-900 text-xl font-medium mb-2">
                ห้องประชุม 1
              </label>
              <p className="text-gray-700 text-base mb-4">ขนาดห้อง: เล็ก</p>
              <p className="text-gray-700 text-base mb-4">ความจุ: 30 คน</p>
              <div className="flex flex-row mb-4">
                <p className="text-gray-700 text-base mb-4 pr-2">สถานะ:</p>
                <p className="text-green-500 text-base mb-4 pr-2">
                  พร้อมใช้งาน
                </p>
              </div>
              <div className="flex flex-row justify-end">
                <button
                  type="button"
                  className="inline-block mx-2 px-6 py-2.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-150 ease-in-out"
                >
                  แก้ไข
                </button>
                <button
                  type="button"
                  className="inline-block mx-2 px-6 py-2.5 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mai;
