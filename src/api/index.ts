import menu, { IPizza } from "../data/db";

// 模拟异步获取菜单数据
export function fechMenu(_data = menu) {
    return new Promise<{
        data: IPizza[]
    }>((resolve) =>
        setTimeout(() => resolve({
            data: _data
        }), 500)
    );
}
