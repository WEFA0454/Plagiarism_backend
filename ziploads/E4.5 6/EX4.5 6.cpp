/*
programmer:¿ÍêÅÑô
date: 2023.9.20
*/
#include<stdio.h>
#include<windows.h>
int main() {
	int x, y, z;
	printf("Please enter the three cards' values(regard jack, queen, king as 11, 12, 13):");
	scanf("%d%d%d", &x, &y, &z);
	if(x <= 0 || x > 13 || y <= 0 || y > 13 || z <= 0 || z > 13){
		printf("an invalid value has been entered!\n");
		return 0;
	}
	int sum = 0;
	if(x >= 10) x = 10;
	if(y >= 10) y = 10;
	if(z >= 10) z = 10;
	sum += x;
	sum += y;
	sum += z;
	if (sum > 21) {
		int sum2 = 0;
		sum2 += x;
		sum2 += y;
		sum2 += z;
		printf("the total value of the three card is %d\n", sum2);
		printf("the value of three cards respectively is %d %d %d\n", x, y, z);
	} else {
		int sum2 = 0;
		if (x == 1) x = 11;
		if (y == 1) y = 11;
		if (z == 1) z = 11;
		sum2 += x;
		sum2 += y;
		sum2 += z;
		printf("the total value of the three card is:%d\n", sum2);
		printf("the value of three cards respectively is:%d %d %d\n", x, y, z);
	}
	system("pause");
	return 0;
}
