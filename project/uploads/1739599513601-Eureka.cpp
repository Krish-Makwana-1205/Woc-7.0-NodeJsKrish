#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
string addZeros(const string &s, int length)
{
string ans = s;
while (ans.length() < length)
{
ans = '0' + ans;
}
return ans;
}
int nextPowerOfTwo(int n)
{
int power = 1;
while (power < n) {
power <<= 1;
}
return power;
}
string addBinary(const string &a, const string &b)
{
string result = "";
int carry = 0;
int n = a.length();
for (int i = n - 1; i >= 0; --i)
{
int sum = (a[i] - '0') + (b[i] - '0') + carry;
carry = sum / 2;
result = (sum % 2 ? '1' : '0') + result;
}
if (carry)
{
result = '1' + result;
}
return result;

}
string multiplyBinary(const string &x, const string &y)
{
int n = x.length();
if (n == 1)
{
return to_string((x[0] - '0') * (y[0] - '0'));
}
int mid = n / 2;
string xL = x.substr(0, mid);
string xR = x.substr(mid, n - mid);
string yL = y.substr(0, mid);
string yR = y.substr(mid, n - mid);
string P1 = multiplyBinary(xL, yL);
string P2 = multiplyBinary(xR, yR);
string P3 = multiplyBinary(addBinary(xL, xR), addBinary(yL, yR));
string crossTerms = addBinary(P3, to_string(-((stoi(P1) + stoi(P2)))));
for (int i = 0; i < 2 * mid; ++i)
P1 += '0';
for (int i = 0; i < mid; ++i)
crossTerms += '0';
return addBinary(addBinary(P1, crossTerms), P2);
}
int main()
{
string x, y;
cin >> x;
cin >> y;
int maxLength = max(x.length(), y.length());
int newLength = nextPowerOfTwo(maxLength);
x = addZeros(x, newLength);
y = addZeros(y, newLength);
string result = multiplyBinary(x, y);

cout << result;
return 0;
}