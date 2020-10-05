import { css } from "uebersicht";
import { run } from "uebersicht";

export const command = 'ps axo "rss,pid,ucomm" | sort -nr';
export const refreshFrequency = 5000;

export const className = `
    left: 35px;
    bottom: 30px;
    color: #fff;
    opacity: 0.8;
    font-family: Helvetica Neue;
`;

export const table = css`
    border-collapse: collapse;
    table-layout: fixed;
`;

export const tableElement = css`
    border: 1px solid #fff;
    font-size: 28px;
    font-weight: 100;
    width: 120px;
    padding: 5px;
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-shadow: 0 0 1px hsla(0, 0%, 0%, 0.5);
`;

export const tableTitle = css`
    position: absolute;
    left: 0;
    top: -33px;
    font-size: 24px;
    font-weight: 200;
`;

export const wrapper = css`
    padding: 4px 6px 4px 6px;
    position: relative;
`;

export const colOne = css`
    background: hsla(0, 0%, 0%, 0.2);
`;

export const colTwo = css`
    background: hsla(0, 0%, 0%, 0.1);
`;

export const info = css`
    padding: 0;
    margin: 0;
    font-size: 13px;
    font-weight: normal;
    max-width: 100%;
    color: #ddd;
    text-overflow: ellipsis;
`;

const cleanMemoryData = output => {
    let data_list = output
        .split("\n")
        .filter(data => data)
        .map(data => data.trim());
    let data_objects = [];
    let total_mem = 0;
    for (let data of data_list) {
        let found = data.split(/[ ,]+/);
        let memory = parseInt(found[0] / 1024);
        let pid = parseInt(found[1]);
        let name = found.length > 3 ? `${found[2]} ${found[3]}` : found[2];

        let process = data_objects.find(process => process.name === name);
        if (process) {
            process.memory += memory;
            total_mem += memory;
        } else {
            if (!isNaN(total_mem + memory)) {
                total_mem += memory;
            }
            data_objects.push({
                name,
                memory,
                pid,
            });
        }
    }
    console.log("total_mem", total_mem);
    return { total_mem, data_objects };
};

const prettyPrintMemoryData = mem => {
    // console.log("MSMSMMSMS", mem);
    let unit = mem > 1000 ? "GB" : "MB";
    let value = mem > 1000 ? (mem / 1000).toFixed(2) : mem;
    return `${value} ${unit}`;
};

export const render = ({ output, error }) => {
    let { data_objects: processes, total_mem } = cleanMemoryData(output);
    processes = processes.slice(0, 4);
    return (
        <div>
            <div className={tableTitle}>
                malloc: <span style={{ fontSize: "24px", fontWeight: "300" }}>{prettyPrintMemoryData(total_mem)}</span>
            </div>
            <table className={table}>
                <tr>
                    {processes.map((proc, index) => {
                        return (
                            <td className={tableElement}>
                                <div className={wrapper}>{prettyPrintMemoryData(proc.memory)}</div>
                                <div className={info}>{proc.name}</div>
                            </td>
                        );
                    })}
                </tr>
            </table>
        </div>
    );
};
