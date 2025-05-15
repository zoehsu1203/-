import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const CostCalculator = () => {
  const [selections, setSelections] = useState({
    basePrice: true,
    noodleType: "curry",
    sauce: "mushroom",
    egg: "normal",
    extraItems: [],
  });

  const [totals, setTotals] = useState({
    totalPrice: 0,
    cost: 0,
    platformFee: 0,
    profit: 0,
  });

  const calculateTotals = () => {
    let price = 0;
    let cost = 0;

    // 基本價格
    if (selections.basePrice) {
      price += 270;
      cost += 132.16;
    }

    // 主食選擇
    switch (selections.noodleType) {
      case "oilNoodle":
        cost += 3.36;
        break;
      case "spiralNoodle":
        cost += 3.6;
        break;
      case "curry":
        cost += 16.31;
        break;
    }

    // 醬料選擇
    switch (selections.sauce) {
      case "blackPepper":
        price += 10;
        break;
      case "spicy":
        price += 15;
        cost += 13.6;
        break;
    }

    // 蛋的選擇
    if (selections.egg === "double") {
      price += 10;
      cost += 4;
    }

    // 加購項目
    selections.extraItems.forEach(item => {
      switch (item) {
        case "normalCurry":
          price += 40;
          cost += 23.71;
          break;
        case "spicyCurry":
          price += 55;
          cost += 29.02;
          break;
        case "rice":
          price += 20;
          cost += 13;
          break;
      }
    });

    const platformFee = price * 0.38;
    const profit = price - cost - platformFee;

    setTotals({
      totalPrice: price,
      cost: cost,
      platformFee: platformFee,
      profit: profit,
    });
  };

  useEffect(() => {
    calculateTotals();
  }, [selections]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">小時厚牛排成本試算</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 主食選擇 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">選擇主食</h3>
          <RadioGroup
            value={selections.noodleType}
            onValueChange={(value) => setSelections({...selections, noodleType: value})}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="curry" id="curry" />
              <Label htmlFor="curry">原味小咖哩飯120g (醬/飯分裝)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oilNoodle" id="oilNoodle" />
              <Label htmlFor="oilNoodle">油麵120g</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spiralNoodle" id="spiralNoodle" />
              <Label htmlFor="spiralNoodle">螺旋麵120g</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">飯麵皆不需要</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* 醬料選擇 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">選擇醬料</h3>
          <RadioGroup
            value={selections.sauce}
            onValueChange={(value) => setSelections({...selections, sauce: value})}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mushroom" id="mushroom" />
              <Label htmlFor="mushroom">蘑菇醬150g</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blackPepper" id="blackPepper" />
              <Label htmlFor="blackPepper">黑胡椒醬120g (+$10)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spicy" id="spicy" />
              <Label htmlFor="spicy">辣個醬40g (+$15)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* 蛋的選擇 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">蛋的選擇</h3>
          <RadioGroup
            value={selections.egg}
            onValueChange={(value) => setSelections({...selections, egg: value})}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normalEgg" />
              <Label htmlFor="normalEgg">炒蛋(一顆蛋)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="double" id="doubleEgg" />
              <Label htmlFor="doubleEgg">再加一顆蛋 (+$10)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="noEgg" />
              <Label htmlFor="noEgg">不要蛋</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* 加購項目 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">加購項目</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="normalCurry"
                checked={selections.extraItems.includes('normalCurry')}
                onCheckedChange={(checked) => {
                  setSelections({
                    ...selections,
                    extraItems: checked
                      ? [...selections.extraItems, 'normalCurry']
                      : selections.extraItems.filter(item => item !== 'normalCurry')
                  });
                }}
              />
              <Label htmlFor="normalCurry">原味大咖哩飯250g (+$40)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="spicyCurry"
                checked={selections.extraItems.includes('spicyCurry')}
                onCheckedChange={(checked) => {
                  setSelections({
                    ...selections,
                    extraItems: checked
                      ? [...selections.extraItems, 'spicyCurry']
                      : selections.extraItems.filter(item => item !== 'spicyCurry')
                  });
                }}
              />
              <Label htmlFor="spicyCurry">辣味大咖哩飯250g (+$55)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rice"
                checked={selections.extraItems.includes('rice')}
                onCheckedChange={(checked) => {
                  setSelections({
                    ...selections,
                    extraItems: checked
                      ? [...selections.extraItems, 'rice']
                      : selections.extraItems.filter(item => item !== 'rice')
                  });
                }}
              />
              <Label htmlFor="rice">白飯250g (+$20)</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* 計算結果表格 */}
        <div className="border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">項目</th>
                <th className="px-4 py-2 text-right">金額</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">總金額</td>
                <td className="px-4 py-2 text-right">${totals.totalPrice}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">成本</td>
                <td className="px-4 py-2 text-right">${totals.cost.toFixed(2)}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">外送平台抽成(38%)</td>
                <td className="px-4 py-2 text-right">${totals.platformFee.toFixed(2)}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">利潤</td>
                <td className="px-4 py-2 text-right">
                  <span className={totals.profit < 0 ? "text-red-500" : "text-green-500"}>
                    ${totals.profit.toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostCalculator;
