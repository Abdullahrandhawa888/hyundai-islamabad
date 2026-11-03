/** Which oil fits which model, as on hyundai-nishat.com: a tick where it fits,
 * a dash where it doesn't. */
export function OilFitTable({
  caption,
  models,
  rows,
}: {
  caption: string;
  models: readonly string[];
  rows: readonly { name: string; fits: readonly boolean[] }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-center text-[12px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-navy text-white uppercase">
            <th scope="col" className="w-[24%] px-3 py-3.5 font-semibold normal-case">
              Models
            </th>
            {models.map((model) => (
              <th key={model} scope="col" className="px-2 py-3.5 font-semibold">
                {model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-line odd:bg-white">
              <th scope="row" className="px-3 py-3 text-[15px] font-semibold">
                {row.name}
              </th>
              {row.fits.map((fits, index) => (
                <td key={models[index]} className={`px-2 py-3 ${fits ? "text-[16px]" : "text-muted"}`}>
                  {fits ? <span aria-label="Fits">✓</span> : <span aria-label="Does not fit">-</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
