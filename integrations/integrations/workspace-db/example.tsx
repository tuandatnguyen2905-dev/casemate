/**
 * WorkspaceDB example — reference for Space apps.
 * useWorkspaceDB / __workspaceDb are provided globally when the compiler detects usage; do not add npm imports for the SDK.
 * Create tables via Otto (db_create_table) before expecting runtime queries to succeed.
 */
export default function OrdersDashboard() {
  const { data: orders, loading, error, total, refresh } = useWorkspaceDB('orders', {
    shared: true,
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 50,
  });

  const db = (window as any).__workspaceDb;

  const handleAddOrder = async () => {
    await db.from('orders').insert({
      customer_name: 'New Customer',
      total: 0,
      status: 'pending',
    });
    refresh();
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    await db.from('orders').update(id, { status });
    refresh();
  };

  const handleDelete = async (id: number) => {
    await db.from('orders').delete(id);
    refresh();
  };

  if (loading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Orders ({total})</h2>
        <button
          onClick={handleAddOrder}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Order
        </button>
      </div>

      <div className="space-y-2">
        {orders.map((order: any) => (
          <div key={order.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <span className="font-medium">{order.customer_name}</span>
              <span className="ml-2 text-gray-500">${order.total}</span>
            </div>
            <div className="flex gap-2">
              <select
                value={order.status}
                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(order.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
