#!/usr/bin/python3

import json
import os
import plistlib
import sys

AIRPD_PRODUCT_INDX = {
    8206: "airpodpro",
    8194: "airpod1",
    8207: "airpod2"
}


class AirPod:
    def __init__(self, address: str, name: str, left: str, right: str, case: str, product_id: int, vendor_id: int,  is_connected: bool, product: str = "",):
        self.address = address
        self.name = name
        self.left = left
        self.right = right
        self.case = case
        self.product_id = product_id
        self.vendor_id = vendor_id
        self.product = AIRPD_PRODUCT_INDX.get(self.product_id) if self.product_id in AIRPD_PRODUCT_INDX else "n/a"
        self.is_connected = is_connected

# for debugging purpose: defaults read /Library/Preferences/com.apple.Bluetooth


def airpod_battery_status(device_id: str) -> tuple:
    """
    Get device status with a given address (MAC)

    Args:
        device_id (str): MAC address of the Device to search

    Returns:
        tuble: Left/Right/Case battery status
    """
    with open("/Library/Preferences/com.apple.Bluetooth.plist", "rb") as f:
        pl = plistlib.load(f)
    devices: dict = pl.get("DeviceCache")
    ret: tuple = tuple()
    for d, v in devices.items():
        if device_id in d:
            right: str = v.get("BatteryPercentRight") if v.get("BatteryPercentRight") else None
            left: str = v.get("BatteryPercentLeft") if v.get("BatteryPercentLeft") else None
            case: str = v.get("BatteryPercentCase") if v.get("BatteryPercentCase") else None
            product_id: str = v.get("ProductID") if v.get("ProductID") else None
            vendor_id: str = v.get("VendorID") if v.get("VendorID") else None
            ret = (left, right, case, product_id, vendor_id)
            break
    return ret


def get_airpods() -> list:
    """
    Get list of connected AirPods

    Returns:
        list: Return AirPod Device Object-list with address, name, left/right battery
    """
    jsn = json.loads(os.popen('/usr/local/bin/blueutil --paired --format json').read())
    connected_aps: list = list()
    for v in jsn:
        name: str = v.get('name')
        address: str = v.get('address')
        # if v.get('connected'):
        left, right, case, product_id, vendor_id = airpod_battery_status(address)
        ap = AirPod(address, name, left, right, case, product_id, vendor_id, v.get('connected'))
        # 76: Apple; 8206: AirPods Pro; 8194: AirPods 1; 8207: AirPods 2
        if ap.vendor_id == 76 and ap.product_id in AIRPD_PRODUCT_INDX:
            connected_aps.append(ap)
    return connected_aps


def get_device_objects() -> list:
    """
    Generates list of devices incl name and battery status of Airpods

    Returns:
        list: List of HTML strings

    """
    aps: list = get_airpods()
    devices = list()
    for ap in aps:
        devices.append({
            "left": f"L {ap.left}%" if ap.left else "",
            "right": f"R {ap.right}%" if ap.right else "",
            "case": f"C {ap.case}%" if ap.case else "",
            "product": f'{ap.product}',
            "address": f'{ap.address}' if ap.address else "",
            "is_connected": ap.is_connected,
            "name": ap.name,
        })
    return devices


def main():
    connected_list = get_device_objects()
    sys.stdout.write(json.dumps(connected_list))


if __name__ == "__main__":
    main()
